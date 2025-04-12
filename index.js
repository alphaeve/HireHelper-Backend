import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js"; // ✅ new import

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://hire-helper.vercel.app",
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/interview", interviewRoutes); // ✅ mount new routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const trackRouter = require('./routes/track');
app.use('/', trackRouter);

