const Profile = require('../models/profileModel')
const User = require('../models/userModel')


const updateProfile = async (req, res) => {
    const email = req.body.email;
    const profile = await Profile.findOne({ email })

    if (!profile) {

        return res.status(400).send({
            msg: 'profile does not exist '
        })

    } else {
        await Profile.updateOne({ email },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                contactNumber: req.body.contactNumber,
                currentAddress: req.body.currentAddress,
                birthday: req.body.birthday,
                permanentAddress: req.body.permanentAddress,
                avatar: req.body.avatar,
            })

        await User.updateOne({ email },
            {
                name: req.body.nickName,
            })

        const currentProfile = await Profile.findOne({ email })
        const currentUser = await User.findOne({ email })

        return res.status(200).send({
            msg: 'Update profile successfully',
            profile: currentProfile,
            user: currentUser
        })
    }
}

module.exports = {
    updateProfile
}