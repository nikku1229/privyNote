import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import diaryRoutes from "./routes/diary.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [
        process.env.CLIENT_LOCAL_URL,
        process.env.CLIENT_PRODUCTION_URL,
      ];

      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: "Too many requests, try again later.",
});

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/diary", diaryRoutes);

app.get("/", (req, res) => {
  res.send("PrivyNote backend is running 🔐");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
