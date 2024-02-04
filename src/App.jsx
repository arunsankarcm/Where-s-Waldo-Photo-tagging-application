import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './game';
import Layout from './layout';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/play" element={<Layout />} />
            </Routes>
        </Router>
    );
};

export default App;