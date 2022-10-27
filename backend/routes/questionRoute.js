const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
  downVoteQuestion
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createQuestion);
router.get("/", protect, getQuestions);
router.get("/:id", protect, getQuestionById);
router.patch("/:id", protect, updateQuestion);
router.delete("/:id", protect, deleteQuestion);
router.patch("/:id/vote", protect, voteQuestion);
router.patch("/:id/down_vote", protect, downVoteQuestion);

module.exports = router;