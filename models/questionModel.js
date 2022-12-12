const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
                required: true,
            },
        ],
        votes : [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
        ],
        downVotes : [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
        ],
        answers: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Answer",
            },
        ],
        viewCount: {
            type: Number,
            default: 0
        },
        followedBy: [Object],
        userObj: Object
    },
    {
        timestamps: true,
    }
);

const questionToFrontEndView = (question, userID) => {
    const frontEndQuestion = {
        _id: question._id,
        name: question.name,
        description: question.description,
        tags: question.tags,
        answers: question.answers,
        followedBy: question.followedBy,
        viewCount: question.viewCount,
        userObj: question.userObj
    }

    frontEndQuestion.isUpvotedByThisUser = (question.votes.indexOf(userID) !== -1)
    frontEndQuestion.isDownvotedByThisUser = (question.downVotes.indexOf(userID) !== -1)

    frontEndQuestion.votes = question.votes.length
    frontEndQuestion.downVotes = question.downVotes.length

    return frontEndQuestion
}

module.exports = {
    Question: mongoose.model("Question", questionSchema),
    questionToFrontEndView: questionToFrontEndView,
}
