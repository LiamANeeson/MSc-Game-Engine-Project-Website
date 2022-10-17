const Profile = require('../models/profileModel')


const updateProfile = async (req, res) => {
    const email = req.body.email;
    const profile = await Profile.findOne({ email })

    if (!profile) {

        return res.status(400).send({
            msg: 'profile does not exist '
        })

    } else {
        await Profile.updateOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            contactNumber: req.body.contactNumber,
            currentAddress: req.body.currentAddress,
            birthday: req.body.birthday,
            permanentAddress: req.body.permanentAddress,
            avatar: req.body.avatar,
        })

        const currentProfile = await Profile.findOne({ email })

        console.log(currentProfile)

        return res.status(200).send({
            msg: 'Update profile successful',
            profile: currentProfile
        })
    }
}

module.exports = {
    updateProfile
}