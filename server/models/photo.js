const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
    name: String,
    x: Number,
    y: Number
});

const imageSchema = new mongoose.Schema({
    imageUrl: String,
    targets: [objectSchema]
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
