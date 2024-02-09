const Photo = require('../models/photo');

exports.PhotoVerification = async (req, res) => {
    try {
        const { photoId } = req.params;
        const { characterName, x, y } = req.body;
        const image = await Photo.findById(photoId);

        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        const target = image.targets.find(target => target.name === characterName);
        if (!target) {
            return res.status(404).json({ message: "Target not found" });
        }

        const TOLERANCE = 25; // pixels
        const isCorrect = Math.abs(target.x - x) <= TOLERANCE && Math.abs(target.y - y) <= TOLERANCE;

        res.json({ correct: isCorrect });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


    
