const express = require("express");
const router = express.Router();
const { createAnswer,getAnswerById,voteAnswer,downVoteAnswer } = require("../controllers/answerController");
const { protect } = require('../middleware/authMiddleware')

router.post("/",protect, createAnswer);
router.get("/:id", protect, getAnswerById);
router.patch("/:id/vote", protect, voteAnswer);
router.patch("/:id/down_vote", protect, downVoteAnswer);
module.exports = router;
