import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ManageBlogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleDelete = async (id) => {
        setLoading(true)
        const token = JSON.parse(localStorage.getItem("user"));

        if (!token) {
            alert("You are not logged in");
            setLoading(false)
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete-blog`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,

                },
                body: JSON.stringify({ id }),
            })
            const data = await response.json();
            alert(data.message)
            setLoading(false)

        } catch (err) {
            console.log("handleDdelete", err);
            setLoading(false)

        }
    }

    return (
        <>
            <div>
                {blogs.map((blog, index) => (
                    <div key={index} className='manage-blog-cont' onClick={() => handeBlogClick(blog._id)}>
                        <div className="manage-blog-cont-in">

                            <h2>{blog.title}</h2>
                            <p>
                                {blog.content.length > 150
                                    ? `${blog.content.slice(0, 150)}...`
                                    : blog.content}
                            </p>
                        </div>
                        <div className="del">
                            <button onClick={() => handleDelete(blog._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            )}

        </>
    )
}

export default ManageBlogs