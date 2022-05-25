import React, { useEffect, useState } from 'react'
import Main from './pages/Main.jsx'
import "./App.css";
import CreateBlog from './pages/CreateBlog.jsx';
import { Routes, Route } from "react-router-dom";
import BlogContext from './BlogContext.js';
import ViewBlog from './pages/ViewBlog.jsx';
import EditBlog from './pages/EditBlog.jsx';
const App = () => {
  const [Blogs, setBlogs] = useState([])

  useEffect(() => {

    const items = localStorage.getItem('blogData');
    if (items) {
      setBlogs(JSON.parse(items));
    }
  }, [Blogs]);

  return (
    <>
      <div className='body'>
        <BlogContext.Provider value={{ Blogs, setBlogs }}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/create-blog' element={<CreateBlog />} />
            <Route path='/edit-blog/:id' element={<EditBlog />} />
            <Route path='/view-blog/:id' element={<ViewBlog />} />
            <Route path='*' element={<Main />} />
          </Routes>
        </BlogContext.Provider>
      </div>
    </>
  )
}

export default App