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
            <div className="btn-container">
                <button onClick={handleOpenModal} className="btn btn1">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default GameCard;