import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import "./login.css"

const Login = ({ setIsLoggedIn }) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {

            const response = await fetch(`http://localhost:5500/login`, {
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
            }

            else {
                alert(data.msg || "Login failed")
            }
        } catch (error) {
            console.log("Login", error);
            alert("Error")

        }
        setLoading(false)
    }

    useEffect(() => {
        document.title = "Login";
    })
    return (
        <>
            <div className="log-inp-out">
                <div className="log-inp-in">
                    <form onSubmit={handleSubmit} className='auth-form'>
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
                        <button type="submit" className='btn-sub-log'>Login</button>

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

export default Login