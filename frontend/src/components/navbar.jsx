import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            const token = JSON.parse(localStorage.getItem("user"));
            if (!token) return;

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserInfo(response.data.user); // decoded and verified user data
            } catch (error) {
                console.error("Token verification failed:", error);
                setIsLoggedIn(false); // force logout if token is invalid
                localStorage.removeItem("user");
            }
        };

        verifyUser();
    }, [isLoggedIn, setIsLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <>
            <div className="container">
                <div className="logo">
                    <NavLink to="/">Mayank</NavLink>
                </div>

                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>

                        {!isLoggedIn ? (
                            <>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            </>
                        ) : (

                            <>
                                {userInfo?.isAdmin && (<>
                                    <li><NavLink to="/create">Create</NavLink></li>
                                    <li><NavLink to="/messages">Messages</NavLink></li>
                                    <li><NavLink to="/manageBlogs">ManageBlogs</NavLink></li>
                                </>
                                )}
                                <li>
                                    <NavLink to="/profile">
                                        <div className="profile-pic" >
                                            <img
                                                src={userInfo?.profileImage || "/dummy profile pic.webp"}
                                                alt="Profile"
                                            />
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="logout" >Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>


        </>
    )
}

export default Navbar