import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js"; // ✅ new import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/interview", interviewRoutes); // ✅ mount new routes

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
