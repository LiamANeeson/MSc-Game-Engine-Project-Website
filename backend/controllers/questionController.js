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
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "createdAt";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    const questions = await Question.find({
      name: { $regex: search, $options: "i" },
    })
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Question.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      questions,
    };
    res.status(200).json(response);
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
      votes: req.user
    });
    if (question.length > 0)
      return res.status(400).json({ msg: "Something went wrong!" });

    const vote = await Question.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { votes: req.user._id },
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

//DownVote Question
const downVoteQuestion = async (req, res) => {
  try {
    const question = await Question.find({
      _id: req.params.id,
      likes: req.user._id,
    });
    if (question.length === 0)
      return res.status(400).json({ msg: "You did not like this post." });

    const unlike = await Question.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { votes: req.user._id },
      },
      { new: true }
    );

    if (!unlike)
      return res.status(400).json({ msg: "This post does not exist." });

    res.json({ msg: "Unliked Post!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const followQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(400).json({ msg: "question does not exist." });

    const newUser = await Question.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { followedBy: req.user._id },
      },
      { new: true }
    );

    // await User.findOneAndUpdate(
    //   { _id: req.user._id },
    //   {
    //     $push: { followedBy: req.params.id },
    //   },
    //   { new: true }
    // );

    res.json({ newUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.unFollowUser = async (req, res) => {
  try {
    const user = await User.find({
      _id: req.params.id,
      followers: req.user._id,
    });
    if (user.length === 0)
      return res.status(400).json({ msg: "You did not follow this user." });

    const newUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    ).populate("followers following", "-password");

    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $pull: { following: req.params.id },
      },
      { new: true }
    );

    res.json({ newUser });
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