import exppress from "express";
import {
    createOrderCtrl,
    getAllordersCtrl,
    getSingleOrderCtrl,
    updateOrderCtrlAdmin,
    getOrderStatsCtrl,
} from "../controllers/orders.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const orderRouter = exppress.Router();

orderRouter.post("/", isLoggedIn, createOrderCtrl);
orderRouter.get("/", isLoggedIn, isAdmin, getAllordersCtrl);
orderRouter.get("/sales/stats", isLoggedIn, isAdmin, getOrderStatsCtrl);
orderRouter.put("/:id", isLoggedIn, isAdmin, updateOrderCtrlAdmin);
orderRouter.get("/:id", isLoggedIn, getSingleOrderCtrl);

export default orderRouter;