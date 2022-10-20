const Question = require("../models/questionModel");

//Create a new question.
const createQuestion = async (req, res) => {
  const information = req.body;
  console.log(req.user);
  const newQuestion = new Question({
    ...information,
    userObj: req.user,
  });
  console.log(newQuestion);
  try {
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Get all questions.
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("answers");
    res.status(200).json({
      success: true,
      questions: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//Get question by ID
const getQuestionById = async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Update question
const updateQuestion = async (req, res) => {
  try {
    const { questionBody } = req.body;
    const question = await Question.findOneAndUpdate(
      { _id: req.params.id },
      {
        questionBody,
      }
    );
    res.json({
      msg: "Updated Post!",
      newQuestion: {
        ...question._doc,
        questionBody,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Delete a question
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Deleted Post!",
      post: question,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Vote Question
const voteQuestion = async (req, res) => {
  try {
    const question = await Question.find({
      _id: req.params.id,
      Votes: req.user
    });
    if (question.length > 0)
      return res.status(400).json({ msg: "You liked this question." });

    const vote = await Question.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { Votes: req.user._id },
      },
      { new: true }
    );

    if (!vote)
      return res.status(400).json({ msg: "This question does not exist." });

    res.json({ msg: "Liked Question!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  voteQuestion
};