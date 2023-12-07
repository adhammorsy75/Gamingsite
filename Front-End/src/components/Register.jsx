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

    const [errors, setErrors] = useState({});
    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        specialChar: false,
        uppercase: false,
        lowercase: false,
        digit: false,
    });


    const validateForm = (userData) => {
        const errors = {};

        if (!userData.name) {
            errors.name = 'Name is required';
        }

        if (!userData.email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(userData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!userData.contact) {
            errors.contact = 'Contact is required';
        } else if (!isValidPhoneNumber(userData.contact)) {
            errors.contact = 'Contact must be a 10-digit number';
        }

        if (!userData.age) {
            errors.age = 'Age is required';
        }

        if (!userData.gender) {
            errors.gender = 'Gender is required';
        }

        if (!userData.password) {
            errors.password = 'Password is required';
        } else {
            const validationResults = validatePassword(userData.password);
            setPasswordValidation(validationResults);

            if (!validationResults.length) {
                errors.password = 'Password must meet all criteria';
            }
        }

        return errors;
    };

    const isValidEmail = (email) => {
        //Add email validation code here
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (input) => {
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern.test(input);
    };

    const validatePassword = (password) => {
        const lengthValid = password.length >= 8;
        const specialCharValid = /[!@#$%^&*]/.test(password);
        const uppercaseValid = /[A-Z]/.test(password);
        const lowercaseValid = /[a-z]/.test(password);
        const digitValid = /\d/.test(password);

        return {
            length: lengthValid,
            specialChar: specialCharValid,
            uppercase: uppercaseValid,
            lowercase: lowercaseValid,
            digit: digitValid,
        };
    };

    const renderValidationStatus = (isValid) => {
        return isValid ? (
            <i className="fa fa-check text-success"></i>
        ) : (
            <i className="fa fa-times text-danger"></i>
        );
    };

    return (
        <div>
            <div className="container shadow my-5">
                <div className="row justify-content-end">
                    <div className="col-md-5 d-flex flex-column align-items-center form text-white justify-content-center order-2">
                        <h1 className="display-4 fw-bolder">Hello</h1>
                        <p className="lead text-center">Enter Your Details To Register</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink to="/login" className="btn btn-outline-light rounded-pill pb-2 w-50">
                            Login
                        </NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <form onSubmit={handleSubmit} method="POST">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInput}
                                />
                                {errors.name && <div className="text-danger">{errors.name}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    id="email"
                                    name="email"
                                    onChange={handleInput}
                                    value={user.email}
                                />
                                {errors.email && (
                                    <div className="text-danger">{errors.email}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact" className="form-label">
                                    Contact
                                </label>
                                <input
                                    type="number" // Change to type="text" or use a pattern validation for 10-digit numbers
                                    className="form-contro
                                    name="age"
                                    value={user.age}
                                    onChange={handleInput}
                                />
                                {errors.age && <div className="text-danger">{errors.age}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">
                                    Gender
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="gender"
                                    name="gender"
                                    value={user.gender}
                                    onChange={handleInput}
                                />
                                {errors.gender && <div className="text-danger">{errors.gender}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                        
                                        Uppercase {renderValidationStatus(passwordValidation.uppercase)} <br />
                                        Lowercase {renderValidationStatus(passwordValidation.lowercase)} <br />
                                        Digit {renderValidationStatus(passwordValidation.digit)}
                                    </div>
                                </div>
                                {errors.password && (
                                    <div className="text-danger">{errors.password}</div>
                                )}
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">I Agree terms and Conditions</label>
                            </div>
                            <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
