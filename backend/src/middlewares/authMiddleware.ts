import { Request, Response, NextFunction } from "express";
import { CustomError } from "./errorMiddleware";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.isLoggedIn) {
    next();
  } else {
    const error = new Error(
      "Unauthorized: Please log in to access this resource.",
    );
    (error as CustomError).status = 401;
    next(error);
  }
};
