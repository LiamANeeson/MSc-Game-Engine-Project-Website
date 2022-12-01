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
  getSavedQuestions
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

router.get("/saved-posts", protect, getSavedQuestions); // Route For Getting Questions Saved by user. Order matters...
router.post("/", protect, createQuestion);
router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.patch("/:id", protect, updateQuestion); 
router.delete("/:id", protect, deleteQuestion);
router.patch("/:id/vote", protect, voteQuestion);
router.patch("/:id/down_vote", protect, downVoteQuestion);
router.patch("/:id/save", protect, saveQuestion);

module.exports = router;
