import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

    const [passwords, setPasswords] = useState({
        oP: "",
        nP: "",
        nP1: "",
    })

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const token = JSON.parse(localStorage.getItem("user"));

        if (!token) {
            alert("You are not logged in");
            setLoading(false)
            return;
        }


        try {
            // console.log(passwords.np);

            if (passwords.nP != passwords.nP1) {
                alert("New password and confirm password mismatched");
                setLoading(false)
                return;
            }
            // console.log(passwords.op);

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/change-password`, {
                op: passwords.oP,
                np: passwords.nP,
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setLoading(false)
            navigate("/")
            alert("Password Changed");
        } catch (error) {
            setLoading(false)
            console.error("Change password", error)
        }

    }

    const handleInput = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        setPasswords({
            ...passwords,

            [name]: value,
        });

    }

    return (
        <>
            <div className="inp">
                <form onSubmit={handleSubmit} className='auth-form'>
                    <label htmlFor="pass-1">
                        Current Password
                        <input
                            type="password"
                            name="oP"
                            id='pass-1'
                            placeholder='Current Password'
                            value={passwords.oP}
                            onChange={handleInput}
                        />
                    </label>
                    <label htmlFor="pass-2">
                        New Password
                        <input
                            type="password"
                            name="nP"
                            id='pass-2'
                            placeholder='New Password'
                            value={passwords.nP}
                            onChange={handleInput}
                        />
                    </label>
                    <label htmlFor="pass-3">
                        Confirm Password
                        <input
                            type="password"
                            name="nP1"
                            id='pass-3'
                            placeholder='Confirm Password'
                            value={passwords.nP1}
                            onChange={handleInput}
                        />
                    </label>

                    <button type="submit" className=''>Submit</button>
                </form>

            </div>

            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            )
            }
        </>
    )
}

export default ChangePassword