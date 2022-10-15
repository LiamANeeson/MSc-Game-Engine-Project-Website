const express = require("express");
const router = express.Router();
const { createAnswer,getAnswerById } = require("../controllers/answerController");
const { protect } = require('../middleware/authMiddleware')

router.post("/",protect, createAnswer);
router.get("/:id", protect, getAnswerById);
module.exports = router;