import express from "express";
import {
  getUserProfileController,
  loginController,
  logoutController,
  registerController,
  resetPasswordController,
  updatePasswordController,
  updateProfileController,
  updateProfilePicController,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";
import { rateLimit } from "express-rate-limit";
// RATE LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});
const router = express.Router();

// register routes
router.post("/register", limiter, registerController);
// login routes
router.post("/login", limiter, loginController);
// profile routes
router.get("/profile", isAuth, getUserProfileController);
// logout routes
router.get("/logout", isAuth, logoutController);
// update profile
router.put("/profile-update", isAuth, updateProfileController);
// upadte password
router.put("/update-password", isAuth, updatePasswordController);
// update profile pic
router.put("/update-picture", isAuth, singleUpload, updateProfilePicController);
// forgot password
router.post("/reset-password", resetPasswordController);
export default router;
