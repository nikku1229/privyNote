import Diary from "../models/Diary.js";

export const createDiary = async (req, res) => {
  try {
    const { title, content } = req.body;

    const diary = await Diary.create({
      userId: req.userId,
      title,
      content,
    });

    res.status(201).json(diary);
  } catch (error) {
    res.status(500).json({ message: "Failed to create diary" });
  }
};

export const getMyDiaries = async (req, res) => {
  try {
    const diaries = await Diary.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.json(diaries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch diaries" });
  }
};
