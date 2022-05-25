import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogContext from '../BlogContext'
import BlogInfo from '../components/BlogInfo'
// import "./Main.css"
const Main = () => {

    const { Blogs, setBlogs } = useContext(BlogContext)

    return (
        <main className='inner-container'>
            {
                Blogs.map((item, count) => {
                    return <BlogInfo title={item.title} id={item.id} key={count} />
                })

            }
            <Link to="/create-blog">Create Blog</Link>
        </main>
    )
}

export default Main