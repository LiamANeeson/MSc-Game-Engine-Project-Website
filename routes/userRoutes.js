const express = require('express')
var userFileData = require("../models/files_data");
const router = express.Router()
const {
    registerUser,
    loginUser,
    getUser,
    getFiles,
    resetPassword,
    resetPasswordFromEmail,
    forgotPassword
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const { updateProfile } = require('../controllers/profileController')
const { uploadFiles,upload_Files,download } = require('../controllers/fileUploadController')
router.post('/', registerUser)
router.post('/login', loginUser)
router.get("/getfiles", getFiles);

router.get('/', protect , getUser)
router.get('/user', protect, getUser)
router.post('/profile', updateProfile)
router.post("/upload", uploadFiles);
router.post("/download", download);
router.route('/reset-password').post(resetPassword)
router.route('/reset-password-email').post(resetPasswordFromEmail)
router.route('/forget-password').post(forgotPassword)

module.exports = router