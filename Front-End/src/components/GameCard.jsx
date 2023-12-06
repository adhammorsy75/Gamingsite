import React, { useEffect, useState } from 'react';
import '../styles/Home.css';

const GameCard = ({ game, handleClick }) => {
    const handleOpenModal = () => {
        handleClick(game);
    };
    return (
        <div className='game-card'>
  