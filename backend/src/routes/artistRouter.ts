import { Router } from "express";
import { createArtist } from "../controllers";

export const ArtistsRouter = Router();

ArtistsRouter.post("/create", async (req, res, next) => {
  try {
    const newArtist = await createArtist(req.body);

    return res.status(200).json(newArtist);
  } catch (error) {
    next(error);
  }
});
