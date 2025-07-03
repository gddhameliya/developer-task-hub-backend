import { userRepository } from "../repositories/user.repository";
import { Request } from "express";
import { enums, message } from "../common/constants/index";
import { helper } from "../common/utils/index";

//* Function based user service modules
export const userService = {
  //* Register User Service Function
  registerUser: async (req: Request) => {
    let user = await userRepository.findUser(req);
    if (user) return message.USER_ALREADY_EXIST;

    // * Create the hashed password
    req.body.password = await helper.hashPassword({
      password: req.body.password,
    });

    let userData = await userRepository.registerUser(req);
    let token = await helper.generateToken({
      data: { id: userData.id, email: userData.email, role: userData.role },
    });

    // * Remove password from user data
    delete userData?.dataValues?.password;

    return {
      ...userData?.dataValues,
      token,
    };
  },

  //* Login User Service Function
  loginUser: async (req: Request) => {
    let user = await userRepository.findUser(req);
    if (!user) return message.USER_NOT_FOUND;

    if (
      req.body.password &&
      !(await helper.comparePassword({
        password: req.body.password,
        hashedPassword: user.password,
      }))
    ) {
      return message.INVALID_PASSWORD;
    }

    delete user.password;
    return {
      ...user,
      token: await helper.generateToken({
        data: { id: user.id, email: user.email, role: user.role },
      }),
    };
  },
};
