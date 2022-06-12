import { Router } from "express";
import { CategoryController } from "../controllers/ControllerCategory.js";
import loginRequired from "../middlewars/loginRequired.js";
const categoryRoutes = Router();
const categorysController = new CategoryController();

//POST
categoryRoutes.post("/", categorysController.createcategory);

//GET
categoryRoutes.get("/", loginRequired, categorysController.findAllcategorys);
categoryRoutes.get("/:id", loginRequired, categorysController.findcategory);

//UPDATE
categoryRoutes.put("/:id", loginRequired, categorysController.updatecategory);

//DELETE
categoryRoutes.delete("/:id", categorysController.deletecategory);

export { categoryRoutes };
