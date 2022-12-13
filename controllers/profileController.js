const Profile = require('../models/profileModel')
const User = require('../models/userModel')
const { Question } = require("../models/questionModel");
const Answer = require("../models/answerModel");


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
                avatar: req.body.avatar,
            })

        await User.updateOne({ email },
            {
                name: req.body.userName,
                avatar: req.body.avatar,
            })

        await Question.update({ "userObj.email": email },
            {
                'userObj.avatar': req.body.avatar,
                'userObj.name': req.body.userName,
            },
            {
                multi: true
            })

        await Answer.update({ "userObj.email": email },
            {
                'userObj.avatar': req.body.avatar,
                'userObj.name': req.body.userName,
            },
            {
                multi: true
            })
        await Answer.update({ "comment.userEmail": email },
            {
                "$set": {
                    "comment.$[elem].userAvatar": req.body.avatar,
                    "comment.$[elem].userName": req.body.userName,
                }
            },
            {
                "arrayFilters": [{ "elem.userEmail": email }], 
                multi: true
            })

        const comments = await Answer.find({ "comment.userEmail": email });
            

        const currentProfile = await Profile.findOne({ email })
        const currentUser = await User.findOne({ email })

        return res.status(200).send({
            profile: currentProfile,
            user: currentUser
        })
    }
}

module.exports = {
    updateProfile
}