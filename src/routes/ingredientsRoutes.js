import { Router } from "express";
import { IngredientController } from "../controllers/ControllerIngredient.js";
import loginRequired from "../middlewars/loginRequired.js";

const ingredientRoutes = Router();
const ingredientsController = new IngredientController();

//POST
ingredientRoutes.post("/", ingredientsController.createIngredient);

//GET
ingredientRoutes.get(
  "/",
  loginRequired,
  ingredientsController.findAllIngredients
);
ingredientRoutes.get(
  "/:id",
  loginRequired,
  ingredientsController.findIngredient
);

//UPDATE
ingredientRoutes.put(
  "/:id",
  loginRequired,
  ingredientsController.updateIngredient
);

//DELETE
ingredientRoutes.delete("/:id", ingredientsController.deleteIngredient);

export { ingredientRoutes };
