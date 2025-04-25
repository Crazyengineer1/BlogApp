import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`);
                setBlogs(response.data);
            } catch (err) {
                console.error("Home", err);
            }
        }
        fetchBlogs();
    }, []);

    const handeBlogClick = async (e) => {
        navigate(`/blog/${e}`);
    }

    useEffect(() => {
        document.title = "Home";
    })

    return (
        <>
            <div>
                {blogs.map((blog, index) => (
                    <div key={index} className='blog-cont' onClick={() => handeBlogClick(blog._id)}>
                        <div key={index} className="blog-card" onClick={() => handeBlogClick(blog._id)}>
                            <h2 className="title">{blog.title}</h2>
                            <p className="snippet">
                                {blog.content.length > 150
                                    ? `${blog.content.slice(0, 150)}...`
                                    : blog.content}
                            </p>
                            <p className="read-more">Read More →</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home