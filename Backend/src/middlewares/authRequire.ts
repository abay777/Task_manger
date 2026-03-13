import { Request, Response, NextFunction } from "express"
import { findUserById } from "../models/usersModel"

export const authRequire = async (
  req: any,
  res: Response,
  next: NextFunction
) => {

  try {

    const user = await findUserById(1)

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      })
    }

    req.user = user

    next()

  } catch (error) {

    return res.status(500).json({
      message: "Authentication failed"
    })

  }
}