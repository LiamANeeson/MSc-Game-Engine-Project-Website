const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getUser,
    resetPassword,
    forgotPassword
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const { updateProfile } = require('../controllers/profileController')
const { uploadFiles } = require('../controllers/fileUploadController')

router.post('/', registerUser)
router.post('/login', loginUser)

router.get('/', protect , getUser)
router.get('/user', protect, getUser)
router.post('/profile', updateProfile)
router.post("/upload", uploadFiles);

router.route('/reset-password/:id').put(resetPassword)
router.route('/forget-password').post(forgotPassword)

module.exports = router