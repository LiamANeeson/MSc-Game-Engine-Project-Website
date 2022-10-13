const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");

const createAnswer = async (req, res) => {
  try {
    const { questionId, content } = req.body;

    const question = await Question.findById(questionId);
    if (!question)
      return res.status(400).json({ msg: "This question does not exist." });

    const newAnswer = new Answer({
      content,
      questionId,
      userObj: req.user._id,
    });

    await Question.findOneAndUpdate(
      { _id: questionId },
      {
        $push: { answers: newAnswer },
      },
      { new: true }
    );

    await newAnswer.save();

    res.json({ newAnswer });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Get answer by ID
const getAnswerById = async (req, res) => {
  const answerId = req.params.id;
  try {
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ msg: "answer not found" });
    }
    res.status(200).json(answer);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


module.exports = {
  createAnswer,
  getAnswerById
};