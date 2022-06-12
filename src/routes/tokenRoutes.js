import { Router } from "express";
import { TokenController } from "../controllers/token/TokenController.js";

const tokenRoutes = Router();
const tokenController = new TokenController();

tokenRoutes.post("/", tokenController.handle);

export { tokenRoutes };
