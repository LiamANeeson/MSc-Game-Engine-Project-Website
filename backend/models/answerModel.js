const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    vote: {
      type: Number,
      default: 0,
    },
    question: {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },
    questionId: mongoose.Types.ObjectId,
    userObj: Object
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Answer", answerSchema);