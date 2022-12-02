const express = require('express')
var userFileData = require("../models/files_data");
const router = express.Router()
const {
    registerUser,
    loginUser,
    getUser,
    getFiles,
    resetPassword,
    forgotPassword
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const { updateProfile } = require('../controllers/profileController')
const { uploadFiles,upload_Files } = require('../controllers/fileUploadController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get("/getfiles", getFiles);

router.get('/', protect , getUser)
router.get('/user', protect, getUser)
router.post('/profile', updateProfile)
router.post("/upload", uploadFiles);

router.route('/reset-password').post(resetPassword)
router.route('/forget-password').post(forgotPassword)

module.exports = router