  
import React from 'react';
import './css/startscreen.css';

const StartScreen = ({ onStart, onLeaderboard }) => {
    return (
        <div className="startScreen">
            <div className='leader-board' onClick={onLeaderboard}>
                LEADERBOARD
            </div>
            <img
                src="/start-game.jpg"
                alt="Start Game"
                className="startImage"
                onClick={onStart}
            />
        </div>
    );
};

export default StartScreen;
