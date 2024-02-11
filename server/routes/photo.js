const express = require('express');
const router = express.Router();
const photo_controller = require('../controllers/photoController')
const win_controller = require('../controllers/winController')

router.post('/:photoId/verify', photo_controller.PhotoVerification);
router.post('/submit-score', win_controller.winScreen);

module.exports = router;
