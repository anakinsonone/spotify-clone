import { Router } from "express";
import { createArtist } from "../controllers";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/artists/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "profile-" + uniqueSuffix + path.extname(file.originalname));
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

export const ArtistsRouter = Router();

ArtistsRouter.post(
  "/create",
  upload.single("profileImage"),
  async (req, res, next) => {
    try {
      let artistData = req.body;

      if (!req.file) {
        throw { status: 400, message: "No profile image provided." };
      }

      artistData.image = req.file.path;
      const newArtist = await createArtist(artistData);

      return res.status(200).json(newArtist);
    } catch (error) {
      next(error);
    }
  },
);
