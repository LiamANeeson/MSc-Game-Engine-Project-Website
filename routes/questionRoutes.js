const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
  undoVoteQuestion,
  downVoteQuestion,
  undoDownVoteQuestion,
  getCreatedQuestions,
  getFollowedQuestions,
  followQuestion,
  unfollowQuestion
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getQuestions);
router.post("/created-posts", protect, getCreatedQuestions);
router.post("/followed-posts", protect, getFollowedQuestions);
router.post("/", protect, createQuestion);
router.get("/:id", getQuestionById);
router.patch("/:id", protect, updateQuestion); 
router.delete("/:id", protect, deleteQuestion);
router.patch("/:id/vote", protect, voteQuestion);
router.patch("/:id/undo_vote", protect, undoVoteQuestion);
router.patch("/:id/down_vote", protect, downVoteQuestion);
router.patch("/:id/undo_down_vote", protect, undoDownVoteQuestion);
router.patch("/:id/follow", protect, followQuestion);
router.patch("/:id/unfollow", protect, unfollowQuestion);

module.exports = router;