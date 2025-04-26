import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Messages = () => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchMessages = async (e) => {
            setLoading(true)
            const token = JSON.parse(localStorage.getItem("user"));

            if (!token) {
                alert("You are not logged in");
                setLoading(false)
                return;
            }
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/messages`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    alert(errorData.message);
                    navigate(errorData.redirect);
                    setLoading(false)
                    return;
                }
                const data = await response.json();
                setMessages(data)
                setLoading(false)

            } catch (err) {
                setLoading(false)
                alert(err.response.data)
                console.log("Message", err);
            }

        }
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete-message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id }),
            })
            const data = await response.json();
            alert(data.message)
        } catch (err) {
            console.log("Delete", err);

        }
    }

    return (
        <>
            {messages.map((message, index) => (
                <div key={index} className='message-cont' >
                    <div className="message-cont-in">
                        <h2>{message.username}</h2>
                        <p>{message.message}</p>
                    </div>
                    <div className="del">
                        <button onClick={() => handleDelete(message._id)}>Delete</button>
                    </div>
                </div>
            )
            )}

            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            )}

        </>
    )
}

export default Messages