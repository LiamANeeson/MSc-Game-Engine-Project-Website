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
    views:{
      type: Number,
    },
    totalVotes:{
      type: Number,
    },
    votes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    followedBy: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    answers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Answer",
      },
    ],
    userObj:Object
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);