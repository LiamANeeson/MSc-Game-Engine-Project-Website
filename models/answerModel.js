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
    userObj: Object,
    comment: [{
      type: new mongoose.Schema({
        content: String,
        userEmail: String,
        userName: String,
        userAvatar: String,
        createdAt: { type: Date, default: Date.now }
      }),
      default: null
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Answer", answerSchema);
