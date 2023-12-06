import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        contact: "",
        age: "",
        gender: "",
        password: ""
    });
    // Handle Inputs
    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setUser({ ...user, [name]: value });
    }

    // Handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate the form
        const validationErrors = validateForm(user);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const { name, email, contact, age, gender, password } = user;
                const data = { name, email, contact, age, gender, password };
                const res = await axios.post('http://localhost:3002/user/register', data);

                if (res.status === 200) {
                    // Registration successful
                    window.alert("Registered Successfully");
                    navigate('/login');
                }
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                    window.alert("User Already Exist");
                }
                else if(error.response.status === 400) {
                    window.alert('All Fields are Required')
                }
                else {
                    window.alert("Internal Server Error");
                }
                // Handle other error cases
            }
        } else {
            // Set validation errors and display them to the user
            setErrors(validationErrors);
        }
    }

