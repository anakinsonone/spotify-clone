import { Router, Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../controllers";
import multer from "multer";
import path from "path";
import { validationResult } from "express-validator";
import { redisClient } from "../services/redis";

import { userRegistrationValidationRules } from "../middlewares";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage });
export const UserRouter = Router();

UserRouter.post(
  "/register",
  upload.single("profile_image"),
  userRegistrationValidationRules,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw { status: 400, errors: errors.array() };
      }

      const newUser = await registerUser({
        ...req.body,
        profile_image: req.file?.path,
      });

      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

UserRouter.post("/login", async (req, res, next) => {
  try {
    const login = await loginUser(req.body);

    await redisClient.set(
      `user:${login.user_id}`,
      login.name,
      "EX",
      1 * 365 * 24 * 60 * 60, // 1 year
    );

    req.session.user = { id: login.user_id.toString() };
    res.status(200).json("Logged in");
  } catch (error) {
    next(error);
  }
});

// UserRouter.post("/checkAuth", async(req, res, next) => {
//
// })
