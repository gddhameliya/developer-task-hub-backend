import db from "../model/index";
import { Request } from "express";
import { Op } from "sequelize";

/**
 * Developer Repository
 * Handles all database operations related to developers
 * Only accessible by admin users
 */
export const developerRepository = {
  //* Create a new developer
  create: async (data: any) => {
    return await db.user.create(data);
  },

  //* Find a developer by email
  findByEmail: async (email: string) => {
    return await db.user.findOne({ where: { email, role: "developer" } });
  },

  //* Find a developer by ID
  findAll: async (req: Request) => {
    const { page, limit, search } = req?.query;
    return await db.user.findAndCountAll({
      where: { role: "developer", ...(search ? { [Op.or]: [{ email: { [Op.iLike]: `%${search}%` } }, { name: { [Op.like]: `%${search}%` } }] } : {}) },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["password"] },
      ...(page && { offset: (Number(page) - 1) * Number(limit) }),
      ...(limit && { limit: Number(limit) }),
    });
  },

  //* Find a developer by ID
  findById: async (id: string) => {
    return await db.user.findOne({
      where: { id, role: "developer" },
      attributes: { exclude: ["password"] },
    });
  },

  //* Update a developer by ID
  updateById: async (id: string, updates: any) => {
    const developer = await db.user.findOne({ where: { id, role: "developer" } });
    if (!developer) return null;
    return await developer.update(updates);
  },

  //* Delete a developer by ID
  deleteById: async (id: string) => {
    const developer = await db.user.findOne({ where: { id, role: "developer" } });
    if (!developer) return null;
    await developer.destroy();
    return true;
  },
};
