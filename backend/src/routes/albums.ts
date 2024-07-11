import { Router } from "express";
import { createAlbum } from "../controllers";

export const AlbumRouter = Router();

AlbumRouter.post("/create", async (req, res, next) => {
  try {
    const newAlbum = await createAlbum(req.body);

    return res.status(200).json(newAlbum);
  } catch (error) {
    next(error);
  }
});
