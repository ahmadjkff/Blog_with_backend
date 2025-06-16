import { NextFunction, Response } from "express";
import { IExtendRequest } from "../types/extendedRequest";

export const isAdmin = (
  req: IExtendRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send("Admin access required");
  }
  next();
};
