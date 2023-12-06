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
   