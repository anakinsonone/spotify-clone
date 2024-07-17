import { Router } from "express";
import { createSong } from "../controllers";

export const SongsRouter = Router();

SongsRouter.post("/create", async (req, res, next) => {
  try {
    const newSong = await createSong(req.body);

    return res.status(200).json(newSong);
  } catch (error) {
    next(error);
  }
});
