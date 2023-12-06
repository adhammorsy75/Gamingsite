import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/Cart.css';
import { IoTrashBinOutline } from "react-icons/io5";
import NavBar from './NavBar';

const Cart = ({ setIsAuthenticated }) => {
    const user = JSON.parse(Cookies.get('userData'));
    const [cart, setCart] = useState('');

    const fetchData = async () => {
        try {
            const userID = user._id;
            const res = await axios.get(`http://localhost:3002/cart/fetch/${userID}`);
            if (res.status === 200) {
                setCart(res.data);
            }
        } catch (error) {
            if (error.response.status !== 404) {
                window.alert('Internal Server Error');
            }
            else {
                setCart('');
            }
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

    const handleClearCart = async () => {
        try {
            const res = await axios.delete(`http://localhost:3002/cart/clear/${cart._id}`);
            if (res.status === 200) {
                fetchData();
            }
        } catch (error) {
            window.alert('Internal Server Error');
        }
    };

  

export default Cart;