import { Router } from "express";
import { ProductController } from "./controllers/ControllerProduct.js";
import { UsersController } from "./controllers/ControllerUser.js";
import { FeedbackController } from "./controllers/ControllerFeedback.js";
import { CategoryController } from "./controllers/ControllerCategory.js";
import { IngredientController } from "./controllers/ControllerIngredient.js";
import { BrandController } from "./controllers/ControllerBrand.js";
import { TokenController } from "./controllers/token/TokenController.js";
import loginRequired from "./middlewares/loginRequired.js";
const router = Router();
const token = new TokenController();
//CREATE
const createProduct = new ProductController();
const createUser = new UsersController();
const createFeedback = new FeedbackController();
const createCategory = new CategoryController();
const createIngredient = new IngredientController();
const createBrand = new BrandController();
//FIND
const productFind = new ProductController();
const categoryFind = new CategoryController();
const userFind = new UsersController();
const feedbackFind = new FeedbackController();
const ingredientFind = new IngredientController();
const brandFind = new BrandController();
//UPDATE
const userUpdate = new UsersController();
const productUpdate = new ProductController();
const categoryUpdate = new CategoryController();
const feedbackUpdate = new FeedbackController();
const ingredientUpdate = new IngredientController();
const brandUpdate = new BrandController();
//DELETE
const userDelete = new UsersController();
const productDelete = new ProductController();
const categoryDelete = new CategoryController();
const feedbackDelete = new FeedbackController();
const ingredientDelete = new IngredientController();
const brandDelete = new BrandController();
// POSTS
router.post("/product", createProduct.createProduct);
router.post("/user", createUser.createUser);
router.post("/feedback", createFeedback.createFeedback);
router.post("/category", createCategory.createCategory);
router.post("/ingredient", createIngredient.createIngredient);
router.post("/brand", createBrand.createBrand);
// GETS
router.get("/product/:id", productFind.findProduct);
router.get("/allProducts/:id", productFind.findAllProduct);
router.get("/feedback/:id", feedbackFind.findFeedback);
router.get("/allFeedbacks", feedbackFind.findAllFeedbacks);
router.get("/category/:id", categoryFind.findCategory);
router.get("/allCategorys", categoryFind.findAllCategorys);
router.get("/user/:id", loginRequired, userFind.findUser);
router.get("/allUsers", userFind.findAllUsers);
router.get("/ingredient/:id", ingredientFind.findIngredient);
router.get("/allIngredients", ingredientFind.findAllIngredients);
router.get("/brand/:id", brandFind.findBrand);
router.get("/allBrands", brandFind.findAllBrands);
//UPDATES
router.put("/user/:id", loginRequired, userUpdate.updateUser);
router.put("/product/:id", productUpdate.updateProduct);
router.put("/category/:id", categoryUpdate.updateCategory);
router.put("/feedback/:id", feedbackUpdate.updateFeedback);
router.put("/ingredient/:id", ingredientUpdate.updateIngredient);
router.put("/brand/:id", brandUpdate.updateBrand);
//DELETES
router.delete("/user/:id", userDelete.deleteUser);
router.delete("/product/:id", productDelete.deleteProduct);
router.delete("/category/:id", categoryDelete.deleteCategory);
router.delete("/feedback/:id", feedbackDelete.deleteFeedback);
router.delete("/ingrediente/:id", ingredientDelete.deleteIngredient);
router.delete("/brand/:id", brandDelete.deletebrand);

//TOKENROUTES
router.post("/token", token.handle);
export { router };
