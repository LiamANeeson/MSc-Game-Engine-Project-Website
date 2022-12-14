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
        const limit = parseInt(req.query.limit) || 6;
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
        let userID = null
        if (req.user) {
            userID = req.user._id
        } else {
            userID = null
        }
        res.status(200).json(questionToFrontEndView(question, userID))
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
        console.log(req.user._id, question.votes)
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

//Undo vote Question
const undoVoteQuestion = async (req, res) => {
    let question;

    try {
        question = await Question.findOne({
            _id: req.params.id,
        })
    } catch (err) {
        console.log("ex: ", err)
        return res.status(500).json({ msg: "Something went wrong!" })
    }

    try {
        await Question.updateOne(
            { _id: req.params.id },
            {
                $pull: { votes: req.user._id },
            }
        )
    } catch (err) {
        console.log("ex: ", err)
        return res.status(400).json({ msg: "Something went wrong!" })
    }

    res.json({ msg: "Undo upvote question successful!" })
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

//DownVote Question
const undoDownVoteQuestion = async (req, res) => {
    let question;

    try {
        question = await Question.findOne({
            _id: req.params.id,
        })
    } catch (err) {
        console.log("ex: ", err)
        return res.status(500).json({ msg: "Something went wrong!" })
    }

    try {
        await Question.updateOne(
            { _id: req.params.id },
            {
                $pull: { downVotes: req.user._id },
            }
        )
    } catch (err) {
        console.log("ex: ", err)
        return res.status(400).json({ msg: "Something went wrong!" })
    }

    res.json({ msg: "Undo downvote question successful!" })
};

const followQuestion = async (req, res) => {
    try {
        const followObject = {
            _id: req.user._id,
            followTime: new Date(),
        };
        const question = await Question.findById(req.params.id);
        /*
       const question = await Question.find({
         _id: req.params.id,
         followedBy: req.user._id,
       });*/
        if (question.length > 0)
            return res.status(400).json({ msg: "Something went wrong!" });

        const follow = await Question.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: { followedBy: followObject },
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
                $pull: {
                    followedBy: { _id: req.user._id }
                },
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

const getCreatedQuestions = async (req, res) => {
    try {

        const page = parseInt(req.body.page) - 1 || 0;
        const search = req.body.search || "";
        const limit = parseInt(req.body.limit) || 5;


        const userEmail = req.user.email;

        let where = {
            name: { $regex: search, $options: "i" },
            "userObj.email": userEmail
        };

        let createdQuestions;

        allCreatedQuestions = await Question.find({ "userObj.email": userEmail }).sort({ "createdAt": -1 });

        createdQuestions = await Question.find(where).sort({ "createdAt": -1 }).skip(page * limit)
            .limit(limit);

        console.log(createdQuestions);

        const total = await Question.countDocuments(where);

        allCreatedQuestionsArray = allCreatedQuestions
            ? allCreatedQuestions.map((question) => question)
            : [];

        createdQuestionsArray = createdQuestions
            ? createdQuestions.map((question) => question)
            : [];

        const response = {
            error: false,
            total: total,
            page: page + 1,
            createdQuestions: createdQuestionsArray,
            allCreatedQuestions: allCreatedQuestionsArray
        };
        res.json(response);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message });
    }
};

const getFollowedQuestions = async (req, res) => {
    try {

        const page = parseInt(req.body.page) - 1 || 0;
        const limit = parseInt(req.body.limit) || 6;
        const search = req.body.search || "";


        var userID = req.user._id;

        let where = {
            name: { $regex: search, $options: "i" },
            "followedBy._id": userID
        };

        let followedQuestions;


        allFollowedQuestions = await Question.find({ "followedBy._id": userID }).sort({ "followedBy.followTime": -1 });

        followedQuestions = await Question.find(where).sort({ "followedBy.followTime": -1 }).skip(page * limit)
            .limit(limit);

        const total = await Question.countDocuments(where);

        allFollowedQuestionsArray = allFollowedQuestions
            ? allFollowedQuestions.map((question) => question)
            : [];

        followedQuestionsArray = followedQuestions
            ? followedQuestions.map((question) => question)
            : [];

        const response = {
            error: false,
            total: total,
            page: page + 1,
            followedQuestions: followedQuestionsArray,
            allFollowedQuestions: allFollowedQuestionsArray
        };
        res.json(response);
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
    undoVoteQuestion,
    downVoteQuestion,
    undoDownVoteQuestion,
    followQuestion,
    unfollowQuestion,
    getCreatedQuestions,
    getFollowedQuestions,
};