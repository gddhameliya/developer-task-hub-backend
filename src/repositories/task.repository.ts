import db from "../model/index";
import { Op } from "sequelize";

/**
 * Task Repository
 * Handles all database operations related to tasks
 * Accessible by admin and developer users
 */
export const taskRepository = {
  //* Create a new task
  create: async (data: any) => {
    return await db.task.create(data);
  },

  //* Find all tasks with pagination and search
  findAll: async (offset: number, limit: number, search: string) => {
    return await db.task.findAndCountAll({
      where: search
        ? {
            [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } }, { description: { [Op.iLike]: `%${search}%` } }],
          }
        : {},
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
  },

  //* Find tasks assigned to a specific developer with pagination and search
  findByDeveloper: async (developerId: string, offset: number, limit: number, search: string) => {
    return await db.task.findAndCountAll({
      where: {
        developerId,
        ...(search && {
          [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } }, { description: { [Op.iLike]: `%${search}%` } }],
        }),
      },
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
  },

  //* Find a task by ID
  findById: async (id: string) => {
    return await db.task.findByPk(id);
  },

  //* Update task status
  updateStatus: async (id: string, status: string) => {
    const task = await db.task.findByPk(id);
    if (!task) return null;
    return await task.update({ status });
  },
};
