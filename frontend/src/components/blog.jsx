import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null)
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${id}`)
                setBlog(response.data)
            }
            catch (err) {
                console.log("FetchBlog", err);
            }

        }

        fetchBlog();
    }, [id])

    return (
        <>
            {blog ? (
                <>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default Blog