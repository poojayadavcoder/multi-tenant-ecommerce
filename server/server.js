import 'dotenv/config';
import morgan from 'morgan';
import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/auth.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import connectDB from "./config/db.js";

const app = express();
const PORT = 5000;

connectDB();

app.use(express.json());
app.use(cookieParser());

// Request logger (development only)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use("/api/auth", router);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart",cartRoutes)
app.use("/api/orders",orderRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});