import React, { useState } from 'react';
import axios from 'axios';
import './css/winscreen.css'; // You'll create this CSS file in the next step

const WinScreen = ({ show, time, onNewGame }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/photo/submit-score', { name, time });
            console.log(response.data); // For now, just log the response
            onNewGame(); // This should be a function passed down from the parent component that resets the game state
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
