import express from "express";
import {
  createProductController,
  deleteProductController,
  deleteProductImageController,
  getAllProductsController,
  getSingleProductController,
  getTopProductController,
  productReviewController,
  updateProductController,
  updateProductImageController,
} from "../controllers/productController.js";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();
// get all products
router.get("/get-all", getAllProductsController);
// get top
router.get("/top", getTopProductController);
// get single product
router.get("/:id", getSingleProductController);
// create product
router.post("/create", isAuth, isAdmin, singleUpload, createProductController);
// update product
router.put("/:id", isAuth, isAdmin, updateProductController);
// update product image
router.put(
  "/image/:id",
  isAuth,
  isAdmin,
  singleUpload,
  updateProductImageController
);
// delete product image
router.delete(
  "/delete-image/:id",
  isAuth,
  isAdmin,
  deleteProductImageController
);
// delete product
router.delete("/:id", isAuth, isAdmin, deleteProductController);
// REVIEW PRODUCT
router.put("/:id/review", isAuth, productReviewController);
export default router;
