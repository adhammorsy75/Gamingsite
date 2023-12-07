import React, { useEffect, useState } from 'react';
import '../styles/Home.css';

const GameCard = ({ game, handleClick }) => {
    const handleOpenModal = () => {
        handleClick(game);
    };
    return (
        <div className='game-card'>
            <img className='image' src={game.image} alt="Game's pic" />
            <div className="name">
                {game.name}
            </div>
            <div className='details'>
                {game.details}
  
            </div>
        </div>
    );
}

export default GameCard;