import { prisma } from "../db/prismaClient";
import { SongsCreateInput } from "../types";

export const createSong = async (song: SongsCreateInput) => {
  const newSong = await prisma.songs.create({
    data: {
      ...song,
    },
  });

  return newSong;
};
