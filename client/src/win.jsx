import React, { useState } from 'react';
import axios from 'axios';
import './css/winscreen.css';   

const WinScreen = ({ show, time, onNewGame }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/photo/submit-score', { name, time });
            console.log(response.data);   
            onNewGame();   
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="win-screen-overlay">
            <div className="win-screen-modal">
                <h2>You Win!</h2>
                <p>Your time: {time} seconds</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default WinScreen;
