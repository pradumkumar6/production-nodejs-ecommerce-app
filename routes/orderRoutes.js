import express from "express";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";
import {
  changeOrderStatusController,
  createOrderController,
  getAllOrdersController,
  getMyOrdersController,
  getSingleOrderController,
  paymentController,
} from "../controllers/orderController.js";
const router = express.Router();
// create  orders
router.post("/create", isAuth, createOrderController);
// get all orders
router.get("/my-orders", isAuth, getAllOrdersController);
// get single order info
router.get("my-orders/:id", isAuth, getSingleOrderController);
// accept payments
router.post("/payments", isAuth, paymentController);
// admin routes
// get all orders
router.get("/admin/get-all-orders", isAuth, isAdmin, getMyOrdersController);
// change order status
router.put("/admin/order/:id", isAuth, isAdmin, changeOrderStatusController);
export default router;
