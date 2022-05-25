import React from 'react'
import "./BlogInfo.css";
import { Link } from "react-router-dom";
const BlogInfo = ({ title, id }) => {
    console.log(title);
    return (
        <div className='blogInfo'>
            <Link to={`view-blog/${id}`}><h3>{title}</h3></Link>
        </div >
    )
}

export default BlogInfo