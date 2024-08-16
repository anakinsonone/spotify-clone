import { Router } from "express";
import { createReadStream, statSync } from "fs";
import multer from "multer";
import path from "path";
import { createSong } from "../controllers";
import { prisma } from "../db/prismaClient";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/songs/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an audio file!"));
    }
  },
});

export const SongsRouter = Router();

SongsRouter.post("/create", upload.single("song"), async (req, res, next) => {
  try {
    if (!req.file) {
      throw { status: 400, message: "No audio file uploaded." };
    }

    const songData = req.body;
    songData.path = req.file.path;
    songData.album_id = parseInt(req.body.album_id);
    songData.duration = parseInt(req.body.duration);

    const newSong = await createSong(songData);

    return res.status(200).json(newSong);
  } catch (error) {
    next(error);
  }
});
