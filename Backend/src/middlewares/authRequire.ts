import { Request, Response, NextFunction } from "express"

export const authRequire = (
  req: any,
  res: Response,
  next: NextFunction
) => {

  req.user = {
    id: 1,
    email: "demo@test.com",
    full_name:'demo'
  }

  next()
}