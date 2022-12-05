const Question = require("../models/questionModel");

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
        name: { $regex: search, $options: "i" }
      };
    }
    else {
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
    const question = await Question.findOne({
      _id: req.params.id,
    });

    if (!question || (question.votes.indexOf(req.user._id) !== -1))
      return res.status(400).json({ msg: "Something went wrong!" });

      try{
      await Question.updateOne(
        { _id: req.params.id },
        {
          $push: { votes: req.user._id },
        }
      )
    } catch (ex) {
      console.log(ex);
    } finally {
      console.log(req.params.id, req.user._id, question.votes)
    }
    res.json({ msg: "Liked question!" });
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
    console.log(req.user)
    const question = await Question.find({
      _id: req.params.id,
      followedBy: req.user._id,
    });
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
    console.log(err)
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
    console.log(err)
    return res.status(500).json({ msg: err.message });
  }
};

const getSavedQuestions = async (req, res) => {
  try {
    const savedQuestions = await Question.find({"_id" : {
      "$in": req.user.savedPosts.slice(0, 5)
    }})
    savedQuestionsArray = savedQuestions ? savedQuestions.map(question => question) : []
    res.json({ savedQuestions: savedQuestionsArray })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: err.message });
  }
};

const getCreatedQuestions = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const createdQuestions = await Question.find({ 'userObj.email': userEmail });

        createdQuestionsArray = createdQuestions ? createdQuestions.map(question => question) : []
        res.json({ createdQuestions: createdQuestionsArray })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message });
    }
};

const getFollowedQuestions = async (req, res) => {
    try {
        var userID = req.user._id;

        const followedQuestions = await Question.find({ 'followedBy': userID });

        console.log(followedQuestions)

        followedQuestionsArray = followedQuestions ? followedQuestions.map(question => question) : []
        res.json({ followedQuestions: followedQuestionsArray })
    } catch (err) {
        console.log(err)
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
  saveQuestion,
  getSavedQuestions,
  getCreatedQuestions,
  getFollowedQuestions
};