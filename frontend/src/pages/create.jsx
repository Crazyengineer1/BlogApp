import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        title: "",
        content: "",
    })

    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        setBlog({
            ...blog,
            [name]: value,
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = JSON.parse(localStorage.getItem("user"));

        if (!token) {
            alert("You are not logged in");
            setLoading(false)
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: blog.title, content: blog.content }),
            });
            setLoading(false)

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message);
                navigate(errorData.redirect);
                return;
            } else {
                alert("Blog created");
                setBlog({
                    title: "",
                    content: "",
                })
            }
        } catch (err) {
            setLoading(false)
            console.error("Create", err);

        }

    }

    return (
        <>
            <div className="blog-inp-out">
                <div className="blog-inp-in">

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">
                            Enter the title for blog
                            <textarea
                                name="title"
                                id="title"
                                placeholder='Title'
                                value={blog.title}
                                onChange={handleInput}
                                cols={35}
                            />
                        </label>

                        <label htmlFor="content">
                            Enter the content
                            <textarea
                                name="content"
                                id="content"
                                placeholder='Content'
                                value={blog.content}
                                onChange={handleInput}
                                rows={33}
                                cols={150}
                            />
                        </label>
                        <div className="btn-cont">
                            <button type="submit" className='blog-sub'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            )}

        </>
    )
}

export default Create