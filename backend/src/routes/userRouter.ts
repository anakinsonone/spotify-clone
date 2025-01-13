import { Router } from "express";
import multer from "multer";
import path from "path";

import { loginUser, registerUser } from "../controllers";
import { userRegistrationValidationRules } from "../middlewares";
import { checkAuth } from "../middlewares/authMiddleware";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users/");
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
  registerUser,
);

UserRouter.post("/login", async (req, res, next) => {
  try {
    const login = await loginUser(req.body);

    req.session.isLoggedIn = true;
    req.session.username = login.name;
    res.status(200).json("Logged in");
  } catch (error) {
    next(error);
  }
});

UserRouter.post("/logout", (req, res, next) => {
  try {
    if (req.session && req.session.isLoggedIn) {
      req.session.destroy((err: Error) => {
        if (err) {
          throw err;
        }
      });

      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully." });
    } else {
      throw { message: "Could not logout, please try again" };
    }
  } catch (error) {
    next(error);
  }
});

UserRouter.get("/protected", checkAuth, async (req, res, next) => {
  try {
    res.status(200).json({ message: "This is a protected path." });
  } catch (error) {
    next(error);
  }
});
