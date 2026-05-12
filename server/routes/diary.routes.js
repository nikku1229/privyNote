import express from "express";
import Diary from "../models/Diary.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createDiary,
  getMyDiaries,
  getSingleDiaryNote,
  editDiary,
  deleteDiary,
} from "../controllers/diary.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createDiary);
router.get("/", authMiddleware, getMyDiaries);
router.get("/:id", authMiddleware, getSingleDiaryNote);
router.put("/:id", authMiddleware, editDiary);
router.delete("/:id", authMiddleware, deleteDiary);

export default router;
