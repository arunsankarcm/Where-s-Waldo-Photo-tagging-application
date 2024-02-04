import React from 'react';
import StartScreen from './startscreen';

const Game = () => {
    const handleStart = () => {
        // Implement start game logic or navigation here
        console.log('Game starting...');
    };

    return <StartScreen onStart={handleStart} />;
};

export default Game;
