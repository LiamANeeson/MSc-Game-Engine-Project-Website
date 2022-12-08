const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
var userFileData = require("../models/files_data");
const Profile = require("../models/profileModel");
const nodemailer = require("nodemailer");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;
    console.log(req.body)

    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("Please Include All Required Fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name: userName,
        email,
        password: hashedPassword,
    });

    await User.updateOne({ email },
        {
            token: generateToken(user._id),
        })

    //Create profile
    const profile = await Profile.create({
        email,
        firstName,
        lastName,
        avatar: "/uploads/default_user_photo.png",
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            profile: profile,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Check if User Email Exists
    const user = await User.findOne({ email });

    

    const userProfile = await Profile.findOne({ email });

    // Check Password Encrypted and Unencrypted
    if (user && (await bcrypt.compare(password, user.password))) {

        await User.updateOne({ email },
            {
                token: generateToken(user._id),
            })

        console.log(user);

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            profile: {
                email: user.email,
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                avatar: userProfile.avatar,
            },
        });
    } else {
        res.status(400);
        throw new Error("Wrong Email or Password");
    }
});

// @desc Get user data
// @route GET /api/users/user
// @access Private
const getUser = asyncHandler(async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};


const resetPassword = async (req, res) => {
     const { oldpassword, newpassword, token } = req.body;

    const id = token;
    //const { id } = req.params;
    console.log(newpassword, oldpassword, id);
    try {
        let user = await User.findOne({ token: id }).select("+password");
        console.log(user);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        console.log(oldpassword, user.password); //oldpassword.trim()

        if (newpassword != oldpassword) {
            return res.status(400).json({ msg: "No New and Old password" });
        }
        const salt = await bcrypt.genSalt(10);
        changepassword = await bcrypt.hash(newpassword, salt);
        await User.findByIdAndUpdate(user._id, {
            $set: { password: changepassword },
        });
        res
            .status(200)
            .json({
                user,
                message: "password changed successfully thanks for visit",
            });
    } catch (error) {
        return res.status(400).json({ msg: "somthing got wrong!" });
    }
};

const transporter = nodemailer.createTransport({
    //service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
});

const sendMail = async (params) => {
    try {
        let info = await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: params.to, // list of receivers
            subject: "Forget Password✔", // Subject line
            html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h1>Welcome to Horizon GE.</h1>
        <h4>Please reset your password to continue✔</h4>
        <h4>Click <a href = '${params.url}'>here</a>to reset your password</h4>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
      </div>
    `,
        });
        return info;
    } catch (error) {
        console.log("error", error);
        return false;
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "user not found with this email" });
        }
        const PasswordToken = bcrypt.hashSync("123456", 10);
        await User.updateOne({ _id: user._id }, { $set: { token: PasswordToken } });
        const url = `${process.env.API_PROXY_URL}/user/reset-password?token=${PasswordToken}`;
        await sendMail({
            to: email,
            url: url,
        });
        res.status(201).json({
            message: `Sent a email to ${email}.`,
        });
    } catch (error) {
        console.log(error);
    }
};

const getFiles = asyncHandler(async (req, res) => {
  let results = await userFileData.find().sort({createdAt: -1});

  try {
    return res.status(200).json({ data: results});
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getFiles,
  getUser,
  resetPassword,
  forgotPassword,
};