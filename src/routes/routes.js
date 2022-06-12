import { Router } from "express";

import { TokenController } from "../controllers/token/TokenController.js";
import { productRoutes } from "./productRoutes";
import { userRoutes } from "./userRoutes";
import { brandRoutes } from "./brandRoutes";
import { feedbackRoutes } from "./feedbackRoutes";
import { ingredientRoutes } from "./routes/ingredientRoutes";
import { categoryRoutes } from "./categoryRoutes";
import { tokenRoutes } from "./tokenRoutes.js";
const router = Router();
const token = new TokenController();

router.use("/product", productRoutes);
router.use("/user", userRoutes);
router.use("/feedback", brandRoutes);
router.use("/category", feedbackRoutes);
router.use("/ingredient", ingredientRoutes);
router.use("/brand", categoryRoutes);

//TOKENROUTES
router.use("/token", tokenRoutes);
export { router };
