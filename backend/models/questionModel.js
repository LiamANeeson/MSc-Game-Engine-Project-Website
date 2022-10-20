const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    Votes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
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