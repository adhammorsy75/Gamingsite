import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [rememberMe, setRememberMe] = useState(false); // State for "Remember me" checkbox

    // Handle Input
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setUser({ ...user, [name]: value });
    };

    // Handle Login
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = user;
        try {
            const res = await axios.post('http://localhost:3002/user/login',
                {
                    email,
                    password,
                    rememberMe: rememberMe,
                }
            );
            if (res.status === 200) {
                // Extract the token from the response
                const { token, user } = res.data;

                if (token) {
                    // Store the token in a secure cookie using document.cookie
                    document.cookie = `jwt=${token}; max-age=${86400}; path=/; samesite=strict`;
                    const userData = {
                        age: user.age,
                        contact: user.contact,
                        _id: user._id,
                        email: user.email,
                        gender: user.gender,
                        name: user.name,
                        role: user.role,
                    }
                    Cookies.set('userData', JSON.stringify(userData));
                    setIsAuthenticated(true);
                    window.alert("Login Successful");
                    navigate("/");
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
                window.alert('Invalid Credentials');
            }
            else if (error.response.status === 401) {
                window.alert('User Not Found');
            }
            else {
                window.alert('Internal Server Error');
            }
        }
    };

    return (
        <div>
            <div className="container shadow my-5">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
                        <h1 className="display-4 fw-bolder">Welcome Back</h1>
                        <p className="lead text-center">Enter Your Credentials To Login</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink
                            to="/register"
                            className="btn btn-outline-light rounded-pill pb-2 w-50"
                        >
                            Register
                        </NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMeCheckbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label className="form-check-label" htmlFor="rememberMeCheckbox">
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100 mt-4 rounded-pill"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
