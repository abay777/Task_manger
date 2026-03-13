import { Request, Response } from "express";
import * as tasksService from '../services/tasksService'


 /** 
 * Retrieves all tasks belonging to the authenticated user.
 *
 * Supports optional query parameters:
 * - status: Filter tasks by status (OPEN | IN_PROGRESS | DONE)
 * - q: Search tasks by title substring
 * - limit: Number of tasks to return (default 10, max 50)
 * - offset: Pagination offset
 *
 * Returns a paginated list of tasks with metadata.
 */
export const getTasks = async (req: any, res: Response) => {
  const userId = req.user.id;

  const result = await tasksService.getTasks(userId, req.query);

  res.json({
    success: true,
    meta: result.meta,
    data: result.tasks
  });
};

/** 
 * Creates a new task for the authenticated user.
 *
 * Request body:
 * - title (required): Title of the task
 * - description (optional): Task description
 *
 * The task is created with:
 * - status = OPEN
 * - created_at = current timestamp
 *
 * Returns the created task.
 */
export const createTask = async (req: any, res: Response) => {
  const userId = req.user.id;

  const { title, description } = req.body;

  const task = await tasksService.createTask(userId, {
    title,
    description
  });

  res.status(201).json({
    success: true,
    data: task
  });
};

/**
 * Updates the status of a specific task belonging to the authenticated user.
 *
 * Request body:
 * - status: One of (OPEN | IN_PROGRESS | DONE)
 *
 * Only tasks owned by the current user can be updated.
 * Returns the updated task.
 */
export const updateTaskStatus = async (req: any, res: Response) => {
  const userId = req.user.id;
  const taskId = Number(req.params.id);

  const { status } = req.body;

  const task = await tasksService.updateTaskStatus(
    userId,
    taskId,
    status
  );

  res.json({
    success: true,
    data: task
  });
};