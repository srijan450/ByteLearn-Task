import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';

const ViewBlog = () => {
    const { id } = useParams("id")
    const [Blog, setBlog] = useState({ title: '', content: '', category: '', id: '', likes: '' });
    const [redirect, setredirect] = useState(false)
    const [ind, setind] = useState(0)
    useEffect(() => {
        const item = localStorage.getItem('blogData');
        if (!item) {
            setredirect(true);
            return
        }

        const data = JSON.parse(item);
        let getBlog = data.find((blog, index) => {
            if (blog.id === id) {
                setind(index)
                return blog;
            }
        });
        if (!getBlog) {
            setredirect(true);
            return
        }

        console.log(getBlog);
        setBlog(getBlog);
    }, [])

    const dltBTN = () => {
        const assure = window.confirm("Are you sure?")
        if (assure) {
            const items = JSON.parse(localStorage.getItem('blogData'));
            items.splice(ind, 1)
            localStorage.setItem('blogData', JSON.stringify(items));
            setredirect(true);
        }
    }

    const likeBTN = () => {
        const items = JSON.parse(localStorage.getItem('blogData'));
        items[ind].likes = Blog.likes + 1;
        setBlog({ ...Blog, likes: Blog.likes + 1 })
        localStorage.setItem('blogData', JSON.stringify(items));
    }

    if (redirect)
        return <Navigate to="/" />

    return (
        <div className="viewBlog">
            <h1>View Blog</h1>
            <div className='blog-body'>
                <h2>{Blog.title}</h2>
                <hr />
                <p>{Blog.category}</p>
                <hr />
                <p>{Blog.content}</p>
                <p></p>
            </div>
            <div className='button-div' style={{ marginTop: '10px' }}>
                <Link to={`/edit-blog/${id}`} className='btn'>Edit</Link>
                <button className='btn' onClick={dltBTN}>Delete</button>
                <button className='btn' onClick={likeBTN}>Likes ({Blog.likes})</button>
            </div>


        </div>
    )
}

export default ViewBlog