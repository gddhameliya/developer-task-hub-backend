import express from "express";
import auth from "../middlewares/auth";
import { developerController } from "../controllers/developer.controller";
import { enums } from "../common/constants";

const router = express.Router();

//? POST
//* Create developer API
router.post("/", auth({ isTokenRequired: true, usersAllowed: [enums.USER_ROLES.ADMIN] }), developerController.create.validation, developerController.create.handler);

//? GET
//* Get all developers API
router.get("/", auth({ isTokenRequired: true, usersAllowed: [enums.USER_ROLES.ADMIN] }), developerController.getAll.validation, developerController.getAll.handler);

//* Get developer by ID API
router.get("/:id", auth({ isTokenRequired: true, usersAllowed: [enums.USER_ROLES.ADMIN] }), developerController.getById.validation, developerController.getById.handler);

//? PUT
//* Update developer API
router.put("/:id", auth({ isTokenRequired: true, usersAllowed: [enums.USER_ROLES.ADMIN] }), developerController.update.validation, developerController.update.handler);

//? DELETE
//* Delete developer API
router.delete("/:id", auth({ isTokenRequired: true, usersAllowed: [enums.USER_ROLES.ADMIN] }), developerController.remove.validation, developerController.remove.handler);

export default router;
