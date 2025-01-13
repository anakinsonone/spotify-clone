import argon2 from "argon2";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { prisma } from "../db/prismaClient";

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

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw { status: 400, errors: errors.array() };
    }

    const { name, email, password, date_of_birth } = req.body;
    const profile_image = req.file?.path

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

    res.status(201).json("User Registered!")
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (user: any) => {
  const { email, password } = user;

  const userExists = await prisma.users.findUnique({ where: { email } });

  if (!userExists) {
    throw new Error(`This email is not registered.`);
  }

  if (await argon2.verify(userExists.password, password)) {
    return userExists;
  } else {
    throw new Error(`Invalid login details.`);
  }
};
