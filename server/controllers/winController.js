const Score = require('../models/user');

exports.winScreen = async (req,res) => {
    try {
        const { name, time } = req.body;
        const newScore = new Score({ name, time });
        await newScore.save();
        res.status(201).send("Score saved");
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).send("Error saving score");
    }
}