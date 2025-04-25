import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import "./register.css";

const Register = ({ setIsLoggedIn }) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,

            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            })

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.token));
                setIsLoggedIn(true);
                navigate("/");
            } else {
                alert(data.msg || "Registration failed");
            }

        } catch (error) {
            console.log("register", error);

        }
        setLoading(false);
    }

    return <>
        <div className="reg-inp-out">
            <div className="reg-inp-in">
                <form onSubmit={handleSubmit} className='auth-form' >
                    <label htmlFor="username">
                        Username
                        <input
                            type="text"
                            name="username"
                            id='username'
                            placeholder='Username'
                            autoComplete='off'
                            value={user.username}
                            onChange={handleInput}
                        />
                    </label>
                    <label htmlFor="email">
                        Email
                        <input
                            type="email"
                            name="email"
                            id='email'
                            placeholder='Email'
                            value={user.email}
                            onChange={handleInput}
                        />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input
                            type="password"
                            name="password"
                            id='password'
                            placeholder='Password'
                            value={user.password}
                            onChange={handleInput}
                        />
                    </label>
                    <br />
                    <button type="submit" className='btn-sub-reg'>Register</button>
                </form>
            </div>
        </div>

        {loading && (
            <div className="spinner-overlay">
                <div className="spinner"></div>
            </div>
        )}
    </>

}

export default Register