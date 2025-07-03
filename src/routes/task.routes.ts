import express from "express";
import auth from "../middlewares/auth";
import { taskController } from "../controllers/task.controller";
import { enums } from "../common/constants";

const router = express.Router();

//? POST
//* Create task API
router.post("/", auth({ isTokenRequired: true, usersAllowed: [enums.USER_ROLES.ADMIN] }), taskController.create.validation, taskController.create.handler);

//? GET
//* Get all tasks API
router.get("/", auth({ isTokenRequired: true, usersAllowed: [enums.USER_ROLES.ADMIN] }), taskController.getAll.validation, taskController.getAll.handler);

//? GET
//* Get my tasks API
router.get("/my", auth({ isTokenRequired: true, usersAllowed: [enums.USER_ROLES.DEVELOPER] }), taskController.getMyTasks.validation, taskController.getMyTasks.handler);

//? PATCH
//* Update task status API
router.put("/status/:id", auth({ isTokenRequired: true, usersAllowed: [enums.USER_ROLES.DEVELOPER] }), taskController.updateStatus.validation, taskController.updateStatus.handler);

export default router;
