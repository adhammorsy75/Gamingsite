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
      

export default Cart;