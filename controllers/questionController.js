const { Question, questionToFrontEndView } = require("../models/questionModel");
const jwt = require('jsonwebtoken')

//Create a new question.
const createQuestion = async (req, res) => {
  const information = req.body;
  console.log(req.user);
  const newQuestion = new Question({
    ...information,
    userObj: req.user,
  });
  //console.log(newQuestion);
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

    let isAll = req.query.isAll;

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    let where = {};

    if (isAll == "true") {
      where = {
        name: { $regex: search, $options: "i" },
      };
    } else {
      where = {
        name: { $regex: search, $options: "i" },
        answers: { $eq: [] },
      };
    }

    // const questions = await Question.find({})

    const questions = await Question.find(where)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Question.countDocuments(where);

    // console.log(questions);

    let userID = null

    if (req.user) {
      userID = req.user._id
    } else {
      userID = null
    }

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      questions: questions.map(question => questionToFrontEndView(question, userID))
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

    await Question.updateOne(
      { _id: questionId },
      { $inc: { viewCount: 1 } }
    )

    res.status(200).json(questionToFrontEndView(question, req.user._id))
  } catch (error) {
    console.log(error)
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
  let question;

  try {
    question = await Question.findOne({
      _id: req.params.id,
    })
  } catch (err) {
    console.log("ex: ", err)
    return res.status(500).json({ msg: "Something went wrong!" })
  }

  if (!question || question.votes.indexOf(req.user._id) !== -1) {
    console.log("Already upvoted!")
    return res.status(400).json({ msg: "Already upvoted!" })
  }

  try {
    await Question.updateOne(
      { _id: req.params.id },
      {
        $push: { votes: req.user._id },
        $pull: { downVotes: req.user._id },
      }
    )
  } catch (err) {
    console.log("ex: ", err)
    return res.status(400).json({ msg: "Something went wrong!" })
  }

  res.json({ msg: "Upvoted question!" })
}

//DownVote Question
const downVoteQuestion = async (req, res) => {
  let question;

  try {
    question = await Question.findOne({
      _id: req.params.id,
    })
  } catch (err) {
    console.log("ex: ", err)
    return res.status(500).json({ msg: "Something went wrong!" })
  }
  if (!question || question.downVotes.indexOf(req.user._id) !== -1) {
    console.log("Already downvoted!")
    return res.status(400).json({ msg: "Already downvoted!" })
  }

  try {
    await Question.updateOne(
      { _id: req.params.id },
      {
        $pull: { votes: req.user._id },
        $push: { downVotes: req.user._id },
      }
    )
  } catch (err) {
    console.log("ex: ", err)
    return res.status(400).json({ msg: "Something went wrong!" })
  }

  res.json({ msg: "Downvoted question!" })
};

const followQuestion = async (req, res) => {
  try {
    console.log(req.user);
    const question = await Question.findById(req.params.id);
    if (question.length > 0)
      return res.status(400).json({ msg: "Something went wrong!" });

    const follow = await Question.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { followedBy: req.user._id },
      },
      { new: true }
    );

    if (!follow)
      return res.status(400).json({ msg: "This question does not exist." });

    res.json({ msg: "Followed Successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

const unfollowQuestion = async (req, res) => {
  try {
    const unfollowedQuestion = await Question.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { followedBy: req.user._id },
      },
      { new: true }
    );

    if (!unfollowedQuestion)
      return res.status(400).json({ msg: "Something went wrong!" });

    res.json({ msg: "Unfollowed Successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

const saveQuestion = async (req, res) => {
  try {
    // if (req.user.savedPosts.indexOf(req.params.id) !== -1) {
    await User.updateOne(
      { _id: req.user._id },
      { $push: { savedPosts: req.params.id } }
    );
    // }
    res.json({ msg: "Saved Successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

const getSavedQuestions = async (req, res) => {
  try {
    const savedQuestions = await Question.find({
      _id: {
        $in: req.user.savedPosts.slice(0, 5),
      },
    });
    savedQuestionsArray = savedQuestions
      ? savedQuestions.map((question) => question)
      : [];
    res.json({ savedQuestions: savedQuestionsArray });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

const getCreatedQuestions = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const createdQuestions = await Question.find({
      "userObj.email": userEmail,
    });

    createdQuestionsArray = createdQuestions
      ? createdQuestions.map((question) => question)
      : [];
    res.json({ createdQuestions: createdQuestionsArray });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

const getFollowedQuestions = async (req, res) => {
  try {
    var userID = req.user._id;

    const followedQuestions = await Question.find({ followedBy: userID });

    followedQuestionsArray = followedQuestions
      ? followedQuestions.map((question) => question)
      : [];
    res.json({ followedQuestions: followedQuestionsArray });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
  downVoteQuestion,
  followQuestion,
  unfollowQuestion,
  saveQuestion,
  getSavedQuestions,
  getCreatedQuestions,
  getFollowedQuestions,
};