import { db } from "../config/database/db"

export const findTasks = async (
  userId: number,
  status?: string,
  q?: string,
  limit = 10,
  offset = 0
) => {

  const query = db("Tasks")
    .where("user_id", userId)
    .orderBy("created_at", "desc")

  if (status) {
    query.where("status", status)
  }

  if (q) {
    query.where("title", "like", `%${q}%`)
  }

  const tasks = await query.limit(limit).offset(offset)

  return tasks
}

export const countTasks = async (
  userId: number,
  status?: string,
  q?: string
) => {

  const query = db("Tasks")
    .where("user_id", userId)

  if (status) {
    query.where("status", status)
  }

  if (q) {
    query.where("title", "like", `%${q}%`)
  }

  const result = await query.count({ total: "*" }).first()

  return Number(result?.total || 0)
}

export const insertTask = async (
  userId: number,
  title: string,
  description?: string
) => {

  const [id] = await db("Tasks").insert({
    user_id: userId,
    title,
    description,
    status: "OPEN",
    created_at: db.fn.now()
  })

  return {
    id,
    user_id: userId,
    title,
    description,
    status: "OPEN"
  }
}
export const updateTaskStatus = async (
  userId: number,
  taskId: number,
  status: string
) => {

  const updated = await db("Tasks")
    .where({
      id: taskId,
      user_id: userId
    })
    .update({
      status
    })

  if (!updated) return null

  const task = await db("Tasks")
    .where({
      id: taskId,
      user_id: userId
    })
    .first()

  return task
}