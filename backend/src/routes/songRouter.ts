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

const upload = multer({ storage: storage });

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

SongsRouter.get("/:song_id", async (req, res, next) => {
  try {
    const song_id = req.params.song_id;
    const songPath = await prisma.songs.findUnique({
      where: {
        song_id: parseInt(song_id),
      },
      select: {
        path: true,
      },
    });

    if (!songPath || !songPath?.path) {
      throw { status: 404, message: "Song not found" };
    }

    const filePath = songPath.path;
    const CHUNK_SIZE = 500 * 1e3;

    const range = req.headers.range || "0";
    const fileSize = statSync(filePath).size;

    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "audio/mpeg",
      "Transfer-Encoding": "chunked",
    };

    res.writeHead(206, headers);

    const stream = createReadStream(filePath, { start, end });
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
});
