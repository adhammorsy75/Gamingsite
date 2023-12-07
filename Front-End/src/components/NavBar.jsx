import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/Navbar.css';

const NavBar = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('userData');
        Cookies.remove('jwt');
        setIsAuthenticated(false);
        navigate('/login');
    };
    return (
        <div className='nav'>
            <div className='flex-div'>
                <Link className='home-link link' to='/'>Home</Link>
            </div>
            <div>
                <button className='link btn' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default NavBar;