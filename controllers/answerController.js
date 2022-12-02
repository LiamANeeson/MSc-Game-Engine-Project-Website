const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");

//create answer
const createAnswer = async (req, res) => {
  try {
    const { questionId, content, isComment } = req.body;
    if (isComment == "1" || isComment == 1) {
      let answerObj = await Answer.findOneAndUpdate(
        { _id: questionId },
        {
          $push: {
            comment: {
              content: content,
              userObj: req.user
            }
          }
        }
      );
      res.json({ answerObj });
    }
    else {
      const question = await Question.findById(questionId);
      if (!question)
        return res.status(400).json({ msg: "This question does not exist." });
      const newAnswer = new Answer({
        content,
        questionId,
        userObj: req.user
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
    }
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

//Vote Answer
const voteAnswer = async (req, res) => {
  try {
    const answer = await Answer.find({
      _id: req.params.id,
      votes: req.user._id,
    });
    if (answer.length > 0)
      return res.status(400).json({ msg: "Something went wrong!" });

    const vote = await Answer.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { votes: req.user._id },
      },
      { new: true }
    );

    if (!vote)
      return res.status(400).json({ msg: "This answer does not exist." });

    res.json({ msg: "Liked answer!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//DownVote Question
const downVoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.find({
      _id: req.params.id,
      likes: req.user._id,
    });
    if (answer.length === 0)
      return res.status(400).json({ msg: "You did not like this answer." });

    const unlike = await Answer.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { votes: req.user._id },
      },
      { new: true }
    );

    if (!unlike)
      return res.status(400).json({ msg: "This answer does not exist." });

    res.json({ msg: "Unliked answer!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


module.exports = {
  createAnswer,
  getAnswerById,
  voteAnswer,
  downVoteAnswer
};