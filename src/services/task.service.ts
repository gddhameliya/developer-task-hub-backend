import { Request } from "express";
import { taskRepository } from "../repositories/task.repository";
import { message } from "../common/constants/index";

/**
 * Task Service
 * Handles all business logic related to tasks
 * Accessible by admin and developer users
 */
export const taskService = {
  //* Create a new task
  create: async (req: Request) => {
    return await taskRepository.create(req.body);
  },

  //* Get all tasks with pagination and search
  getAll: async (query: any) => {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const search = query.search || "";

    //* Fetch tasks with pagination and search
    const { count, rows } = await taskRepository.findAll(offset, limit, search);

    return {
      total: count,
      page,
      limit,
      data: rows,
    };
  },

  //* Get tasks assigned to a specific developer
  getMyTasks: async (developerId: string, query: any) => {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const search = query.search || "";

    //* Fetch tasks assigned to the developer with pagination and search
    const { count, rows } = await taskRepository.findByDeveloper(developerId, offset, limit, search);

    return {
      total: count,
      page,
      limit,
      data: rows,
    };
  },

  //* Update task status
  updateStatus: async (taskId: string, status: string, developerId: string) => {
    const task = await taskRepository.findById(taskId);
    if (!task) return message.NOT_FOUND;
    if (task.developerId !== developerId) return message.UNAUTHORIZED;

    //* Validate status
    const updated = await taskRepository.updateStatus(taskId, status);
    return updated;
  },
};
