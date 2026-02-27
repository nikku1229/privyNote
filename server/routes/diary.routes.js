import express from "express";
import Diary from "../models/Diary.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createDiary, getMyDiaries } from "../controllers/diary.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createDiary);
router.get("/", authMiddleware, getMyDiaries);

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const diary = await Diary.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    res.json(diary);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch diary" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const diary = await Diary.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true },
    );

    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    res.json(diary);
  } catch (error) {
    res.status(500).json({ message: "Failed to update diary" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const diary = await Diary.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    res.json({ message: "Diary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete diary" });
  }
});

export default router;
