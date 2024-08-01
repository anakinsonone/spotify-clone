import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
  errors?: any[];
}

const dev = process.env.NODE_ENV === "development";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  let response: any = {
    status,
    message,
  };

  if (err.errors && err.errors.length > 0) {
    response.errors = err.errors.map((error) => ({
      field: error.path,
      message: error.msg,
    }));
  }

  if (dev) {
    console.error(`%c${err.message}\n${err.stack}`, "color: red");
  }
  res.status(status).json(response);
};
