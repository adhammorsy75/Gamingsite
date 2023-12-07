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

    return (
        <div className='Cart'>
            <NavBar setIsAuthenticated={setIsAuthenticated} />
            <div className='cart-container'>
                <h1>Your Cart</h1>
                {cart ? (
                    <div className='cart-items'>
                        {cart.games?.map((item, index) => (
                            <div key={index} className='cart-item'>
                                <div className='item-details'>
                                    <div className='game-name'>{item.game.name}</div>
                                    <div className='quantity'>Quantity: {item.quantity}</div>
                                </div>
                            </div>
                        ))}
                        <div className='clear-cart-container'>
                            <div className='clear-cart' onClick={handleClearCart}>
                                <IoTrashBinOutline className='bin-icon' size='25px' />Clear Cart
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='empty-cart'>Your cart is empty</div>
                )}
            </div>
        </div>
    );
}

export default Cart;