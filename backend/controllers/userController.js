const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config();
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const Profile = require('../models/profileModel');


// @desc Register new user 
// @route POST /api/users
// @access Public 
const registerUser = asyncHandler(async(req, res) => {
  const { 
    name,
    email, 
    password 
  } = req.body

  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please Include All Required Fields')
  }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const profile = await Profile.create({
        email
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  res.json({message: 'Register User'})
})

// @desc Authenticate a user 
// @route POST /api/users/login
// @access Public 
const loginUser = asyncHandler(async(req, res) => {

    const { email, password } = req.body

  // Check if User Email Exists
    const user = await User.findOne({ email })
    const profile = await Profile.findOne({ email })
  
  // Check Password Encrypted and Unencrypted
  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      profile: profile
    })
  } else {
    res.status(400)
    throw new Error('Wrong Email or Password')
  }
})

// @desc Get user data 
// @route GET /api/users/user
// @access Private 
const getUser = asyncHandler(async(req, res) => {
  res.status(200).json(req.user)
})


// Generate JWT 
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser
}