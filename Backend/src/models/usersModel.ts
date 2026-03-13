import { db } from "../config/database/db"

export const findUserById = async (userId: number) => {

  const user = await db("Users")
    .where("id", userId)
    .first()

  return user
}

export const findUserByEmail = async (email: string) => {

  const user = await db("Users")
    .where("email", email)
    .first()

  return user
}

export const createUser = async (email: string) => {

  const [id] = await db("Users").insert({
    email
  })

  return {
    id,
    email
  }
}