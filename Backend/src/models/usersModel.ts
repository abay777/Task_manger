import { db } from "../config/database/db"

export const findUserById = async (userId: number) => {

  const user = await db("Users")
    .where({ id: userId })
    .first()

  return user || null
}

export const findUserByEmail = async (email: string) => {

  const user = await db("Users")
    .where({ email })
    .first()

  return user || null
}

export const createUser = async (
  email: string,
  fullName?: string
) => {

  const [user] = await db("Users")
    .insert({
      email,
      full_name: fullName
    })
    .returning("*")

  return user
}