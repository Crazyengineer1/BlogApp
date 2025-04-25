import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const UserProfile = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);         // stores user info
    const [error, setError] = useState(null);       // stores any error

    useEffect(() => {
        document.title = "User profile";
    })

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = JSON.parse(localStorage.getItem("user"));

            if (!token) {
                setError("You are not logged in.");
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // token sent in header
                    },
                });

                setUser(response.data.user); // user data from backend
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to fetch profile. Maybe you're not logged in.");
            }
        };

        fetchUserProfile();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading profile...</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login");
    };


    return (
        <>
            <div className="user-info-1">
                <div className="user-info-1-1">
                    <img src={user?.profileImage || "/dummy profile pic.webp"} alt="" />
                </div>
                <div className="user-info-1-2">
                    <p><strong>{user.username}</strong></p>
                    <p>{user.email}</p>
                </div>
            </div >
            <div className="user-info-2">
                <div className="options"><Link to="/changeImage">Change image</Link></div>
                <div className="options"><Link to="/changePassword">Change password</Link></div>
                <button className="options lo" onClick={handleLogout}>Logout</button>
            </div>

        </>
    );
};

export default UserProfile;
