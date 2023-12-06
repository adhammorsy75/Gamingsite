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
      