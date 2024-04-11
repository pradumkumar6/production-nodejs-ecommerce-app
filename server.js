import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connetDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import Stripe from "stripe";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();
// database connection
connetDB();

// stripe config
export const stripe = new Stripe(process.env.STRIPE_API_KEY);
//cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const app = express();
// middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

// routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("api/v1/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Hii I'm endpoint😁");
});
app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
