const express = require('express')
const router = express.Router()
const { 
    registerUser, 
    loginUser, 
    getUser 
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const { updateProfile } = require('../controllers/profileController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/user', protect, getUser)
router.post('/profile', updateProfile)


module.exports = router