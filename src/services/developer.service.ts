import { Request } from "express";
import { developerRepository } from "../repositories/developer.repository";
import { userRepository } from "../repositories/user.repository";
import { helper } from "../common/utils/index";
import message from "../common/constants/message";
import { enums } from "../common/constants";

/**
 * Developer Service
 * Handles all business logic related to developers
 * Only accessible by admin users
 */
export const developerService = {
  //* Create developer (only admin)
  create: async (req: Request) => {
    try {
      //* Check if the user is an admin
      const existing = await userRepository.findUser(req);
      if (existing) return message.USER_ALREADY_EXIST;

      //* Validate password
      req.body.password = await helper.hashPassword({
        password: req?.body?.password,
      });

      req.body.role = enums?.USER_ROLES?.DEVELOPER;

      //* Register the user as a developer
      const developer = await userRepository.registerUser(req);
      if (!developer) return message.FAILED;

      delete developer.dataValues.password;
      return developer;
    } catch (error) {
      console.error("Error creating developer:", error);
      throw new Error("Failed to create developer");
    }
  },

  //* Paginated developer list
  getAll: async (req: Request) => {
    const { count, rows } = await developerRepository.findAll(req);

    return {
      total: count,
      page: parseInt(req.query.page as string, 10) || 1,
      limit: parseInt(req.query.limit as string, 10) || 10,
      data: rows,
    };
  },

  //* Get developer by ID
  getById: async (id: string) => {
    return await developerRepository.findById(id);
  },

  //* Update developer (admin only)
  update: async (id: string, updates: any) => {
    return await developerRepository.updateById(id, updates);
  },

  //* Delete developer
  remove: async (id: string) => {
    return await developerRepository.deleteById(id);
  },
};
