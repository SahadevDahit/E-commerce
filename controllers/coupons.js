import asyncHandler from "express-async-handler";
import Coupon from "../models/coupons.js";
// @desc    Create new Coupon
// @route   POST /api/v1/coupons
// @access  Private/Admin

export const createCouponCtrl = asyncHandler(async (req, res) => {
    const {
        code,
        startDate,
        endDate,
        discount
    } = req.body;
    //check if admin
    //check if coupon already exists
    const couponsExists = await Coupon.findOne({
        code,
    });
    if (couponsExists) {
        throw new Error("Coupon already exists");
    }
    //check if discount is a number
    if (Number.isInteger(discount)) {
        throw new Error("Discount value must be a number");
    }
    //create coupon
    const coupon = await Coupon.create({
        code: code.toUpperCase(),
        startDate,
        endDate,
        discount,
        user: req.userAuthId,
    });
    //send the response
    res.status(201).json({
        status: "success",
        message: "Coupon created successfully",
        coupon,
    });
});

export const validateCoupon = asyncHandler(async (req, res) => {

    const couponFound = await Coupon.findOne({
        code: req.params.code

    });
    if (couponFound?.isExpired) {
        throw new Error("Coupon has expired");
    }
    if (!couponFound) {
        throw new Error("Coupon does exists");
    }
    res.status(200).json({
        status: true,
        message: "valid coupon"
    })
});

// @desc    Get all coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin

export const getAllCouponsCtrl = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find();
    res.status(200).json({
        status: "success",
        message: "All coupons",
        coupons,
    });
});
// @desc    Get single coupon
// @route   GET /api/v1/coupons/:id
// @access  Private/Admin

export const getCouponCtrl = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findOne({
        code: req.params.code
    });
    //check if is not found
    if (coupon === null) {
        throw new Error("Coupon not found");
    }
    //check if expired
    if (coupon.isExpired) {
        throw new Error("Coupon Expired");
    }

    res.json({
        status: "success",
        message: "Coupon fetched",
        coupon,
    });
});

export const updateCouponCtrl = asyncHandler(async (req, res) => {
    const {
        code,
        startDate,
        endDate,
        discount
    } = req.body;
    const coupon = await Coupon.findByIdAndUpdate(
        req.params.id, {
            code: code?.toUpperCase(),
            discount,
            startDate,
            endDate,
        }, {
            new: true,
        }
    );
    if (coupon == null) {
        throw new Error("Coupon not exists")
    }
    res.json({
        status: "success",
        message: "Coupon updated successfully",
        coupon,
    });
});

export const deleteCouponCtrl = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Coupon deleted successfully",
        coupon,
    });
});