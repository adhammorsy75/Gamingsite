import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/NavBar.css';

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
                <h1>S</h1><h2>ANP</h2><h1>G</h1><h2>AMING</h2>

                <Link className='home-link link' to='/'>Home</Link>
                <Link className='home-link link' to='/cart'>Cart</Link>
            </div>
            <div>
                <button className='link btn' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default NavBar;