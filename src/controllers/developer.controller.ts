import { Request, Response } from "express";
import Joi from "joi";
import { validator } from "../middlewares/validator";
import { developerService } from "../services/developer.service";
import { ApiResponse } from "../common/utils/index";

/**
 * Developer Controller
 * Handles all developer related operations
 * Only accessible by admin users
 */
export const developerController = {
  create: {
    validation: validator({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    }),
    handler: async (req: Request, res: Response) => {
      //* Create developer service function
      const result = await developerService.create(req);

      //* Check for existing developer 
      if (typeof result === "string") return ApiResponse.BAD_REQUEST({ res, message: result });
      return ApiResponse.OK({ res, message: "Developer created.", payload: result });
    },
  },

  //* Get all developers
  getAll: {
    validation: validator({
      query: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(10),
        search: Joi.string().optional(),
      }),
    }),
    handler: async (req: Request, res: Response) => {
      //* Get all developers service function 
      const developers = await developerService.getAll(req);
      return ApiResponse.OK({ res, payload: developers });
    },
  },

  //* Get developer by ID 
  getById: {
    validation: validator({
      params: Joi.object({ id: Joi.string().uuid().required() }),
    }),
    handler: async (req: Request, res: Response) => {
      //* Get developer by ID service function
      const developer = await developerService.getById(req.params.id);
      if (!developer) return ApiResponse.NOT_FOUND({ res, message: "Developer not found." });
      return ApiResponse.OK({ res, payload: developer });
    },
  },

  //* Update developer
  update: {
    validation: validator({
      params: Joi.object({ id: Joi.string().uuid().required() }),
      body: Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
      }),
    }),
    handler: async (req: Request, res: Response) => {
      //* Update developer service function
      const updated = await developerService.update(req.params.id, req.body);
      if (!updated) return ApiResponse.NOT_FOUND({ res, message: "Developer not found." });
      return ApiResponse.OK({ res, message: "Developer updated.", payload: updated });
    },
  },

  //* Remove developer
  remove: {
    validation: validator({
      params: Joi.object({ id: Joi.string().uuid().required() }),
    }),
    handler: async (req: Request, res: Response) => {
      //* Remove developer service function
      const deleted = await developerService.remove(req.params.id);
      if (!deleted) return ApiResponse.NOT_FOUND({ res, message: "Developer not found." });
      return ApiResponse.OK({ res, message: "Developer removed." });
    },
  },
};
