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

export const getSingleDiaryNote = async (req, res) => {
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
};

export const editDiary = async (req, res) => {
  try {
    const { title, content } = req.body;
    const diary = await Diary.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, content },
      { new: true },
    );

    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    res.json(diary);
  } catch (error) {
    res.status(500).json({ message: "Failed to update diary" });
  }
};

export const deleteDiary = async (req, res) => {
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
};
