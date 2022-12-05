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
        answers: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Answer",
            },
        ],
        followedBy: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
        userObj: Object
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Question", questionSchema);
