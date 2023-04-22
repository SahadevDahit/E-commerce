import exppress from "express";
import {
    createCouponCtrl,
    getAllCouponsCtrl,
    getCouponCtrl,
    updateCouponCtrl,
    deleteCouponCtrl,
    validateCoupon
} from "../controllers/coupons.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const couponsRouter = exppress.Router();

couponsRouter.post("/", isLoggedIn, createCouponCtrl);

couponsRouter.get("/", getAllCouponsCtrl);
couponsRouter.put("/:id", isLoggedIn, isAdmin, updateCouponCtrl);
couponsRouter.delete("/:id", isLoggedIn, isAdmin, deleteCouponCtrl);
couponsRouter.get("/:code", getCouponCtrl);
couponsRouter.get("/validate/:code", validateCoupon);
export default couponsRouter;