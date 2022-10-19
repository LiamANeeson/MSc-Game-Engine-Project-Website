const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        gender: {
            type: String,
        },
        contactNumber: {
            type: String,
        },
        currentAddress: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        birthday: {
            type: String,
        },
        permanentAddress: {
            type: String,
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Profile', profileSchema, 'profile')