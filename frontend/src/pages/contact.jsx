import React, { useState, useEffect } from 'react'

const Contact = () => {

    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = JSON.parse(localStorage.getItem("user"));

        if (!token) {
            setLoading(false)
            alert("You are not logged in");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ message }),
            });

            setLoading(false);
            if (response.ok) {
                alert("Message delievered");
            }


        } catch (err) {
            setLoading(false);
            console.error("Contact", err);

        }

    }

    useEffect(() => {
        document.title = "Contact page";
    })

    return (
        <>
            <form onSubmit={handleSubmit} className='contact-form'>

                <textarea
                    name="message"
                    id="mess"
                    value={message}
                    onChange={handleInput}
                    cols={60}
                    rows={25}
                />

                <button type='submit' className='blog-sub'> Submit</button>
            </form>

            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            )}

        </>
    )
}

export default Contact