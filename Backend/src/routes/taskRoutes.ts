import { Router } from "express";
import * as tasksController from "../controllers/TaskController";
import { authRequire } from "../middlewares/authRequire";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validate";
import {
  createTaskDto,
  getTasksQueryDto,
  updateTaskStatusDto
} from "../dtos/task.dto";

const taskRouter = Router();

/**
 * GET /api/tasks
 * Retrieve tasks for the authenticated user
 * Supports filtering, search, and pagination
 */
taskRouter.get(
  "/tasks",
  authRequire,
  validate(getTasksQueryDto, "query"),
  asyncHandler(tasksController.getTasks)
);

/**
 * POST /api/tasks
 * Create a new task for the authenticated user
 */
taskRouter.post(
  "/tasks",
  authRequire,
  validate(createTaskDto, "body"),
  asyncHandler(tasksController.createTask)
);

/**
 * PATCH /api/tasks/:id/status
 * Update the status of a specific task
 */
taskRouter.patch(
  "/tasks/:id/status",
  authRequire,
  validate(updateTaskStatusDto, "body"),
  asyncHandler(tasksController.updateTaskStatus)
);

export default taskRouter;