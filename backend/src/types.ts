import { Prisma } from "@prisma/client";
import "express-session";

export type AlbumsCreateInput = Prisma.albumsCreateInput;
export type ArtistsCreateInput = Prisma.artistsCreateInput;
export type SongsCreateInput = Prisma.songsCreateInput;

declare module "express-session" {
  interface SessionData {
    isLoggedIn?: boolean;
    username?: string;
  }
}
