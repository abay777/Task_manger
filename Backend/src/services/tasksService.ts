import * as tasksModel from "../models/tasksModel";


/**
 * Get tasks for a user with optional filtering and pagination.
 * Supports: status filter, title search (q), limit, and offset.
 */
export const getTasks = async (
  userId: number,
  query: any
) => {

  const status = query.status;
  const q = query.q;

  const limit = Math.min(parseInt(query.limit) || 10, 50);
  const offset = parseInt(query.offset) || 0;

  const tasks = await tasksModel.findTasks(
    userId,
    status,
    q,
    limit,
    offset
  );

  const total = await tasksModel.countTasks(
    userId,
    status,
    q
  );

  return {
    tasks,
    meta: {
      total,
      limit,
      offset
    }
  };
};

/**
 * Create a new task for the given user.
 * Title is required. Default status is OPEN.
 */
export const createTask = async (
  userId: number,
  data: {
    title: string;
    description?: string;
  }
) => {

  if (!data.title) {
    const error: any = new Error("Title is required");
    error.status = 400;
    throw error;
  }

  return tasksModel.insertTask(
    userId,
    data.title,
    data.description
  );
};

/**
 * Update task status for a user's task.
 * Allowed values: OPEN | IN_PROGRESS | DONE.
 */
export const updateTaskStatus = async (
  userId: number,
  taskId: number,
  status: string
) => {

  const allowedStatuses = [
    "OPEN",
    "IN_PROGRESS",
    "DONE"
  ];

  if (!allowedStatuses.includes(status)) {
    const error: any = new Error("Invalid status");
    error.status = 400;
    throw error;
  }

  const updatedTask = await tasksModel.updateTaskStatus(
    userId,
    taskId,
    status
  );

  if (!updatedTask) {
    const error: any = new Error("Task not found");
    error.status = 404;
    throw error;
  }

  return updatedTask;
};