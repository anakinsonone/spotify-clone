import "dotenv/config";
import express, { Express, Request, Response } from "express";

import errorHandler from "./middlewares/errorMiddleware";
import { AlbumRouter, ArtistsRouter, SongsRouter } from "./routes";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

app.use("/artists", ArtistsRouter);
app.use("/albums", AlbumRouter);
app.use("/songs", SongsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running on http://localhost:${port}`);
});
