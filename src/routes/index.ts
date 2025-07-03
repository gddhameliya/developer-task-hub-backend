import { Request, Response } from "express";
import ApiResponse from "../common/utils/apiResponse";
import { Router } from "express";
const router = Router();

import userRoute from "./user.routes";
import developerRoute from "./developer.routes";
import taskRoute from "./task.routes";

router.use("/auth", userRoute); //* User Routes
router.use("/developers", developerRoute); //* Developer Routes
router.use("/tasks", taskRoute); //* Task Routes

//* Root Route
router.get("/", async (req: Request, res: Response) => {
  return ApiResponse.OK({ res, message: `Welcome to the Juno Backend apis!`, });
});

//* Wrong Route
router.use((req: Request, res: Response) => {
  return ApiResponse.NOT_FOUND({ res, message: `Oops! Looks like you're lost.`, });
});

export default router;
