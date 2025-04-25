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

    return (
        <>
            <div>
                {blogs.map((blog, index) => (
                    <div key={index} className='blog-cont' onClick={() => handeBlogClick(blog._id)}>
                        <h2>{blog.title}</h2>
                        <p>
                            {blog.content.length > 150
                                ? `${blog.content.slice(0, 150)}...`
                                : blog.content}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home