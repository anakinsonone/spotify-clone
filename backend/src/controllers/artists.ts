import { PrismaClient } from "@prisma/client";
import type { ArtistsCreateInput } from "../types";

const prisma = new PrismaClient();

export const createArtist = async (artist: ArtistsCreateInput) => {
  const newArtist = await prisma.artists.create({
    data: {
      ...artist,
    },
  });

  return newArtist;
};
