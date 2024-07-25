import { Prisma } from "@prisma/client";
import { prisma } from "../db/prismaClient";
import argon2 from "argon2";

const options = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 3,
  parallelism: 1,
  saltLength: 16,
  hashLength: 32,
};

const hashPassword = async (password: string) => {
  try {
    const hash = await argon2.hash(password);

    return hash;
  } catch (error) {
    throw error;
  }
};

const isUserRegistered = async (email: string) => {
  const userExists = await prisma.users.findUnique({ where: { email } });
  if (!userExists) {
    return false;
  }
  return true;
};

export const registerUser = async (user: Prisma.usersCreateInput) => {
  const { name, email, password, date_of_birth, profile_image } = user;

  if (await isUserRegistered(email)) {
    throw { status: 400, message: "This email is already in use." };
  }

  const hashedPassword = await hashPassword(password);

  const dob = date_of_birth ? new Date(date_of_birth) : new Date();
  const dobISO = dob.toISOString();
  const newUser = await prisma.users.create({
    data: {
      name,
      password: hashedPassword,
      email,
      date_of_birth: dobISO,
      profile_image,
    },
  });

  return "user registered!";
};

export const loginUser = async (user: any) => {
  const { email, password } = user;

  const userExists = await prisma.users.findUnique({ where: { email } });

  if (!userExists) {
    throw new Error(`This email is not registered.`);
  }

  if (await argon2.verify(userExists.password, password)) {
    return true;
  } else {
    throw new Error(`Invalid login details.`);
  }
};
