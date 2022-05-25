import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const EditBlog = () => {
    const { id } = useParams("id")
    const [Blog, setBlog] = useState({ title: '', content: '', category: '', id: '' });
    const [ind, setind] = useState(0)
    const [redirect, setredirect] = useState(false)
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

        setBlog(getBlog);
    }, [])

    const setvalue = (e) => {
        const { name, value } = e.target;
        setBlog((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const item = localStorage.getItem('blogData');
        if (item) {
            const prev = JSON.parse(item);
            prev[ind] = Blog;
            localStorage.setItem('blogData', JSON.stringify(prev));
        }
        alert("blog saved successfully");
        setredirect(true);
    }

    if (redirect)
        return <Navigate to="/" />

    return (
        <div className='inner-container'>
            <h2>Edit Your Blog</h2>

            <form method='POST' onSubmit={submitHandler}>
                <div className='input-div'>
                    <label htmlFor='title'>Title</label>
                    <input type="text" name='title' className='input' value={Blog.title} onChange={e => setvalue(e)} placeholder='title for your blog' required />
                </div>

                <div className='input-div'>
                    <label htmlFor='category'>Category</label>
                    <input type="text" name='category' className='input' value={Blog.category} onChange={e => setvalue(e)} placeholder='category for your blog' required />
                </div>


                <div className='input-div'>
                    <label htmlFor='content'>Content</label>
                    <textarea name="content" className='input' placeholder='content for your blog' value={Blog.content} onChange={e => setvalue(e)} required></textarea>
                </div>

                <div className='button-div'>
                    <button className='btn btn-success' type='submit'>Save</button>
                    <button className='btn btn-success'>Cancle</button>
                </div>
            </form>

        </div>
    )
}

export default EditBlog