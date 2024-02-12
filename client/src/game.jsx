  
import React from 'react';
import StartScreen from './startscreen';
import { useNavigate } from 'react-router-dom';

const Game = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/play');
        console.log('Game starting...');
    };

    const handleLeaderboard = () => {
        navigate('/leaderboard');
    };

      
    return <StartScreen onStart={handleStart} onLeaderboard={handleLeaderboard} />;
};

export default Game;
