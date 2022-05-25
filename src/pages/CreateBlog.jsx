import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const CreateBlog = () => {
    const [newBlog, setnewBlog] = useState({ title: '', content: '', category: '', id: '', likes: 0 });
    const [redirect, setredirect] = useState(false)
    const setvalue = (e) => {
        const { name, value } = e.target;
        setnewBlog((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const item = localStorage.getItem('blogData');
        newBlog.id = uuidv4();
        if (item) {
            const prev = JSON.parse(item);
            prev.push(newBlog)
            localStorage.setItem('blogData', JSON.stringify(prev));
        }
        else {
            const arr = [newBlog];
            localStorage.setItem('blogData', JSON.stringify(arr));
        }
        setnewBlog({ title: '', content: '', category: '', id: '' });
        setredirect(true);
        alert("blog submitted successfully");
    }


    if (redirect)
        return <Navigate to="/" />

    return (
        <div className='inner-container'>
            <h2>Create Your Blog</h2>

            <form method='POST' onSubmit={submitHandler}>
                <div className='input-div'>
                    <label htmlFor='title'>Title</label>
                    <input type="text" name='title' className='input' value={newBlog.title} onChange={e => setvalue(e)} placeholder='title for your blog' required />
                </div>

                <div className='input-div'>
                    <label htmlFor='category'>Category</label>
                    <input type="text" name='category' className='input' value={newBlog.category} onChange={e => setvalue(e)} placeholder='category for your blog' required />
                </div>


                <div className='input-div'>
                    <label htmlFor='content'>Content</label>
                    <textarea name="content" className='input' placeholder='content for your blog' value={newBlog.content} onChange={e => setvalue(e)} required></textarea>
                </div>

                <div className='button-div'>
                    <button className='btn btn-success' type='submit'>Submit</button>
                    <button className='btn btn-success' onClick={() => setredirect(true)}>Cancle</button>
                </div>
            </form>

        </div>
    )
}

export default CreateBlog