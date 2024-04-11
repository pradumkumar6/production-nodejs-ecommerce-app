import express from "express";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
const router = express.Router();
// create category routes
router.post("/create", isAuth, isAdmin, createCategoryController);
// get all category
router.get("/get-all", getAllCategoryController);
// delete category
router.delete("/delete/:id", isAuth, isAdmin, deleteCategoryController);
// update category
router.put("/update/:id", isAuth, isAdmin, updateCategoryController);
export default router;
