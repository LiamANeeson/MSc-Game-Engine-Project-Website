const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    votes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    question: {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },
    questionId: mongoose.Types.ObjectId,
    userObj:Object
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Answer", answerSchema);
