import { db } from "../config/database/db"

export const findTasks = async (
  userId: number,
  status?: string,
  q?: string,
  limit = 10,
  offset = 0
) => {

  const tasks = await db("Tasks")
    .where("user_id", userId)
    .modify((query) => {
      if (status) query.where("status", status)
      if (q) query.whereILike("title", `%${q}%`)
    })
    .orderBy("created_at", "desc")
    .limit(limit)
    .offset(offset)

  return tasks
}

export const countTasks = async (
  userId: number,
  status?: string,
  q?: string
) => {

  const result = await db("Tasks")
    .where("user_id", userId)
    .modify((query) => {
      if (status) query.where("status", status)
      if (q) query.whereILike("title", `%${q}%`)
    })
    .count({ total: "*" })
    .first()

  return Number(result?.total || 0)
}

export const insertTask = async (
  userId: number,
  title: string,
  description?: string
) => {

  const [task] = await db("Tasks")
    .insert({
      user_id: userId,
      title,
      description,
      status: "OPEN",
      created_at: db.fn.now()
    })
    .returning("*")

  return task
}

export const updateTaskStatus = async (
  userId: number,
  taskId: number,
  status: string
) => {

  const [task] = await db("Tasks")
    .where({
      id: taskId,
      user_id: userId
    })
    .update({ status })
    .returning("*")

  return task || null
}