import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import axios from 'axios';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import GameCard from './GameCard';
import NavBar from './NavBar';

// Set the app element for react-modal
Modal.setAppElement(document.body);

const Home = ({ setIsAuthenticated }) => {
    const [games, setGames] = useState('');
    const [IsOpenPopup, setIsOpenPopup] = useState(false);
    const user = JSON.parse(Cookies.get('userData'));
    const [formData, setFormData] = useState({
        gameID: "",
        name: "",
        details: "",
        quantity: 1,
    });

    const fetchGames = async () => {
        try {
            const res = await axios.get('http://localhost:3002/games/fetch');
            if (res.status === 200) {
                setGames(res.data);
            }
        } catch (error) {
            console.log('Error while fetching games: ', error);
            if (error.response.status === 500) {
                window.alert('Internal Server Error');
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchGames();
    }, []);

    const handleAddCart = async () => {
        handleModalClose();
        try {
            const res = await axios.post('http://localhost:3002/cart/create',
                {
                    userID: user._id,
                    gameID: formData.gameID,
                    quantity: formData.quantity
                }
            );
            if (res.status === 200) {
                toast.success('Game Added to Cart!', {
                    position: 'top-right', // Set the toast position
                    autoClose: false,
                    progress: false,
                });
            }
        } catch (error) {
            console.log('Error while creating cart', error);
            toast.error('Unable to Add the Game to Cart!', {
                position: 'top-right', // Set the toast position
                autoClose: false,
                progress: false,
            });

        }
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0) {
            setFormData({
                ...formData,
                quantity: newQuantity,
            });
        };
    };

    //Show Modal when button is clicked
    const handleClick = (game) => {
        setFormData({
            ...formData,
            gameID: game._id,
            name: game.name,
            details: game.details,
            quantity: 1,
        });
        setIsOpenPopup(true);
    };

    //Close Modal
    const handleModalClose = () => {
        setIsOpenPopup(false);
    };
