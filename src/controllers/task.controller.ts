import { Request, Response } from "express";
import Joi from "joi";
import { validator } from "../middlewares/validator";
import { taskService } from "../services/task.service";
import { ApiResponse } from "../common/utils/index";

/**
 * Task Controller
 * Handles all task related operations
 * Accessible by admin and developer users
 */
export const taskController = {
  create: {
    validation: validator({
      body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        developerId: Joi.string().uuid().required(),
      }),
    }),
    handler: async (req: Request, res: Response) => {
      //* Check if the user is an admin or developer
      const task = await taskService.create(req);
      if (typeof task === "string") return ApiResponse.BAD_REQUEST({ res, message: task });
      return ApiResponse.OK({ res, message: "Task created successfully.", payload: task });
    },
  },

  //* Get all tasks
  getAll: {
    validation: validator({
      query: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(10),
        search: Joi.string().optional(),
      }),
    }),
    handler: async (req: Request, res: Response) => {
      //* Get all tasks service function
      const tasks = await taskService.getAll(req.query);
      return ApiResponse.OK({ res, payload: tasks });
    },
  },

  //* Get my tasks (for developers)
  getMyTasks: {
    validation: validator({
      query: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(10),
        search: Joi.string().optional(),
      }),
    }),
    handler: async (req: Request, res: Response) => {
      //* Get my tasks service function
      const tasks = await taskService.getMyTasks(req.user.id, req.query);
      return ApiResponse.OK({ res, payload: tasks });
    },
  },

  //* Update task status
  updateStatus: {
    validation: validator({
      params: Joi.object({ id: Joi.string().uuid().required() }),
      body: Joi.object({
        status: Joi.string().valid("pending", "in-progress", "completed").required(),
      }),
    }),
    handler: async (req: Request, res: Response) => {
      //* Update task status service function
      const result = await taskService.updateStatus(req.params.id, req.body.status, req.user.id);
      if (typeof result === "string") return ApiResponse.BAD_REQUEST({ res, message: result });
      return ApiResponse.OK({ res, message: "Task status updated.", payload: result });
    },
  },
};
