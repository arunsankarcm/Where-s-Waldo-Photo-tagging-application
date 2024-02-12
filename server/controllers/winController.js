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

exports.getScore = async (req,res) => {
    try {
        const scores = await Score.find({}).sort({ time: 1 }).exec(); // Sort by time in ascending order
        res.json(scores);
    } catch (error) {
        res.status(500).json({ message: "Error fetching scores", error: error });
    }
}