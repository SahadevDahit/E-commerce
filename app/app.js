import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import {
    globalErrhandler,
    notFound
} from "../middlewares/globalErrHandler.js";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/users.js";
import productsRoutes from "../routes/products.js";
import brandRoutes from "../routes/brands.js";
import categoryRoutes from "../routes/category.js";
import reviewRoutes from "../routes/reviews.js";
import colorsRoutes from "../routes/colors.js";
import shippingAddressRoutes from "../routes/shippingAddress.js"
import CartRoutes from "../routes/carts.js"
import orderRoutes from "../routes/orders.js";
import FeedbackAndReports from "../routes/feedbackAndReports.js";
import CouponsRoutes from "../routes/coupons.js";
import helmet from 'helmet';
const app = express();
app.use(helmet())
app.disable('x-powered-by')
//db connect
dbConnect();
//cors
app.use(cors());
//pass incoming data
app.use(express.json());
//url encoded
app.use(express.urlencoded({
    extended: true
}));

//routes
app.use("/v1/users", userRoutes);
app.use("/v1/products", productsRoutes);
app.use("/v1/brands", brandRoutes);
app.use("/v1/category", categoryRoutes);
app.use("/v1/reviews", reviewRoutes);
app.use("/v1/colors", colorsRoutes);
app.use("/v1/shippingAddress", shippingAddressRoutes);
app.use("/v1/carts", CartRoutes);
app.use("/v1/orders", orderRoutes);
app.use("/v1/feedbackAndReports", FeedbackAndReports);
app.use("/v1/coupons", CouponsRoutes)
app.get("/", (req, res) => {
    res.send("Welcome to E-commerce backend Web Apps");
})
//err middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;