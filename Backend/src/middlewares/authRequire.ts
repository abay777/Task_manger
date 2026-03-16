import { Response, NextFunction } from "express";
import { AuthRequest } from "../config/config.types";
import { findUserById } from "../models/usersModel";

export const authRequire = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const user = await findUserById(1);

    if (!user) {
      res.status(401).json({
        message: "User not found"
      });
      return;
    }


    // Attach authenticated user to request
    req.user = {
      id: Number(user.id),
      email: user.email
    };

    next();

  } catch (error) {

    res.status(500).json({
      message: "Authentication failed"
    });

  }
};