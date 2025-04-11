import express from "express";
import { OpenAI } from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Ask a mock interview question
router.post("/ask-question", async (req, res) => {
  const { role, level } = req.body;

  const prompt = `You are a technical interviewer. Ask one ${level} level technical interview question for the role of a ${role}. Only return the question.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const question = completion.choices[0].message.content;
    res.json({ question });
  } catch (error) {
    console.error("Error generating question:", error.message);
    res.status(500).json({ error: "Failed to generate question" });
  }
});

// Evaluate a candidate's answer with scores and improvement
router.post("/evaluate-answer", async (req, res) => {
  const { question, answer } = req.body;

  const prompt = `
You are an expert interview evaluator. Review the following answer and give:

1. A short improvement suggestion (1-2 lines).
2. A score out of 10 for each of the following:
   - Behavior
   - Grammar
   - Technical Knowledge
   - Creativity
   - Originality

Respond strictly in the following JSON format:
{
  "improvement": "Your tip here...",
  "scores": {
    "behavior": 8,
    "grammar": 7,
    "technical": 6,
    "creativity": 9,
    "originality": 8
  }
}

Question: ${question}
Answer: ${answer}
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const feedbackJSON = completion.choices[0].message.content;

    // Try to parse feedback
    let feedback;
    try {
      feedback = JSON.parse(feedbackJSON);
    } catch (err) {
      // Fallback: send raw response if parsing fails
      feedback = { improvement: "Feedback format error", raw: feedbackJSON };
    }

    res.json({ feedback });
  } catch (error) {
    console.error("Error evaluating answer:", error.message);
    res.status(500).json({ error: "Failed to evaluate answer" });
  }
});

export default router;



// import express from "express";
// import { OpenAI } from "openai";

// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Ask a mock interview question
// router.post("/ask-question", async (req, res) => {
//   const { role, level } = req.body;

//   const prompt = `You are a technical interviewer. Ask one ${level} level technical interview question for the role of a ${role}. Only return the question.`;

//   try {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "gpt-3.5-turbo",
//     });

//     const question = completion.choices[0].message.content;
//     res.json({ question });
//   } catch (error) {
//     console.error("Error generating question:", error.message);
//     res.status(500).json({ error: "Failed to generate question" });
//   }
// });

// // Evaluate a candidate's answer
// router.post("/evaluate-answer", async (req, res) => {
//   const { question, answer } = req.body;

//   const prompt = `You are an expert interviewer. Here's the question and the candidate's answer:\n\nQuestion: ${question}\n\nAnswer: ${answer}\n\nPlease give clear, constructive feedback on the answer. Highlight what is good, what can be improved, and suggestions for better performance. Keep it under 200 words.`;

//   try {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "gpt-3.5-turbo",
//     });

//     const feedback = completion.choices[0].message.content;
//     res.json({ feedback });
//   } catch (error) {
//     console.error("Error evaluating answer:", error.message);
//     res.status(500).json({ error: "Failed to evaluate answer" });
//   }
// });

// export default router;
