import { Router } from "express";
import { UsersController } from "../controllers/ControllerUser.js";
import loginRequired from "../middlewars/loginRequired.js";
import adminRequired from "../middlewars/adminRequired.js";
const userRoutes = Router();
const usersController = new UsersController();

//POST
userRoutes.post("/", usersController.createUser);

//GET
userRoutes.get("/", loginRequired, adminRequired, usersController.findAllUsers);
userRoutes.get("/:id", loginRequired, usersController.findUser);

//UPDATE
userRoutes.put("/:id", loginRequired, usersController.updateUser);

//DELETE
userRoutes.delete("/:id", usersController.deleteUser);

export { userRoutes };
