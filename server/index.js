import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import diaryRoutes from "./routes/diary.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_LOCAL_URL, process.env.CLIENT_PRODUCTION_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/diary", diaryRoutes);

app.get("/", (req, res) => {
  res.send("PrivyNote backend is running 🔐");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
