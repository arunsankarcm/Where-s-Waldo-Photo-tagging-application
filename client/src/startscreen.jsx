import React from 'react';
import './css/startscreen.css'; 

const StartScreen = ({ onStart }) => {
    return (
        <div className="startScreen" onClick={onStart}>
            <div className='leaderboard'>LEADERBOARD</div>
            <img
                src="/start-game.jpg" 
                alt="Start Game"
                className="startImage"
            />
        </div>
    );
};

export default StartScreen;