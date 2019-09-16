const express = require('express');
const router = express.Router();

const profileController = require('./../controllers/profile');

router.post('/getProfile', profileController.getProfile);
router.post('/updateProfile', profileController.updateProfile);
router.post('/getS3UploadPath', profileController.sign_S3);
// router.post('/signup', userController.signup);
module.exports = router;