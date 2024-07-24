import "dotenv/config";
import express, { Express, Request, Response } from "express";

import { errorHandler } from "./middlewares";
import { AlbumRouter, ArtistsRouter, SongsRouter, UserRouter } from "./routes";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

app.use("/artists", ArtistsRouter);
app.use("/albums", AlbumRouter);
app.use("/songs", SongsRouter);
app.use("/users", UserRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server] Server is running on http://localhost:${port}`);
});
