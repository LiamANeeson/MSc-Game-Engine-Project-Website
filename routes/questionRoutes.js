const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
  downVoteQuestion,
  saveQuestion,
  getSavedQuestions,
  getCreatedQuestions,
  getFollowedQuestions,
  followQuestion,
  unFollowQuestion
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getQuestions);
router.get("/saved-posts", protect, getSavedQuestions); // Route For Getting Questions Saved by user. Order matters...
router.get("/created-posts", protect, getCreatedQuestions);
router.get("/followed-posts", protect, getFollowedQuestions);
router.post("/", protect, createQuestion);
router.get("/:id", getQuestionById);
router.patch("/:id", protect, updateQuestion); 
router.delete("/:id", protect, deleteQuestion);
router.patch("/:id/vote", protect, voteQuestion);
router.patch("/:id/down_vote", protect, downVoteQuestion);
router.patch("/:id/save", protect, saveQuestion);
router.patch("/:id/follow", protect, followQuestion);
router.post("/:id/unfollow", protect, unFollowQuestion);
module.exports = router;