  
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/leaderboard.css';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/photo/scores')
            .then(response => {
                  
                setScores(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the scores:', error);
            });
    }, []);

    return (
       <div className='leaderboard-container'>
            <div className="leaderboard">
                <h1>Leaderboard</h1>
                <ol>
                    {scores.map((score, index) => (
                        <li key={score._id}>
                            {score.name} - {score.time} seconds
                        </li>
                    ))}
                </ol>
            </div>
       </div>
    );
};

export default Leaderboard;
