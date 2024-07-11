import { PrismaClient } from "@prisma/client";
import type { AlbumsCreateInput } from "../types";

const prisma = new PrismaClient();

export const createAlbum = async (album: AlbumsCreateInput) => {
  const { release_date } = album;
  const newAlbum = await prisma.albums.create({
    data: {
      ...album,
    },
  });

  return newAlbum;
};
