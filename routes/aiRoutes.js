import express from "express";
import { askInterviewQuestion } from "../services/openaiService.js";

const router = express.Router();

router.post("/interview", async (req, res) => {
  const { message } = req.body;

  try {
    const reply = await askInterviewQuestion(message);
    res.json({ reply });
  } catch (error) {
    console.error("❌ OpenAI Error:", error);
    res.status(500).json({ error: "Something went wrong.", details: error.message });
  }
});

export default router;
