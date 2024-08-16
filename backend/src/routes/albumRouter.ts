import { Router } from "express";
import multer from "multer";
import path from "path";
import { createAlbum } from "../controllers";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/albums/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "cover-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image file!"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const AlbumRouter = Router();

AlbumRouter.post(
  "/create",
  upload.single("coverImage"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw { status: 400, message: "No cover art uploaded." };
      }

      const albumData = req.body;
      albumData.image = req.file.path;
      albumData.artist_id = parseInt(req.body.artist_id);

      const newAlbum = await createAlbum(albumData);

      return res.status(200).json(newAlbum);
    } catch (error) {
      next(error);
    }
  },
);
