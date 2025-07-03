import db from "../model/index";
import { Request } from "express";
import { helper } from "../common/utils/index";

//? /* Interface for query parameters */
interface _query {
  email?: string;
}

//? /* Function based user repo */
export const userRepository = {
  //* Register User repository function
  registerUser: async (req: Request) => {
    return await db.user.create(req.body);
  },

  //* Find User repository function
  findUser: async (req: Request) => {
    const criteria: _query = {
      ...(req.body.email && { email: req.body.email }),
    };

    return await db.user.findOne({
      where: criteria,
      raw: true,
      nest: true,
    });
  },
};
