const express = require('express');
const router = express.Router();
const photo_controller = require('../controllers/photoController')

router.post('/:photoId/verify', photo_controller.PhotoVerification)

module.exports = router;
