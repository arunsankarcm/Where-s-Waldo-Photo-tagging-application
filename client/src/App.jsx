import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './game';
import Layout from './layout';
import Leaderboard from './leaderboard';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/play" element={<Layout />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </Router>
    );
};

export default App;