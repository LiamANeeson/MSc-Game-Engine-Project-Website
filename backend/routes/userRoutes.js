const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const { updateProfile } = require('../controllers/profileController')
const { uploadFiles } = require('../controllers/fileUploadController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/user', protect, getUser)
router.get('/:id', protect , getUser)
router.post('/profile', updateProfile)
router.post("/upload", uploadFiles);

module.exports = router