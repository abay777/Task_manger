import { z } from "zod"

export const createTaskDto = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional()
})

export const updateTaskStatusDto = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "DONE"])
})


export const getTasksQueryDto = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]).optional(),
  q: z.string().optional(),
  limit: z.string().optional(),
  offset: z.string().optional()
})