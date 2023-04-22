import Cart from "../models/carts.js";
import asyncHandler from 'express-async-handler';


/* This code exports several functions that handle CRUD operations for a shopping cart feature in a web
application. */
export const createCart = asyncHandler(async (req, res) => {
    const {
        productId
    } = req.body;
    //color exists
    const cartFound = await Cart.findOne({
        productId
    });
    if (cartFound) {
        throw new Error("items already exists in cart");
    }
    //create
    const cart = await Cart.create({
        product: productId,
        user: req.userAuthId,
    });
    res.json({
        status: "success",
        message: "cart created successfully",
        cart,
    });

})

export const getCart = asyncHandler(async (req, res) => {
    const carts = await Cart.find();
    res.json({
        status: "success",
        message: "carts fetched successfully",
        carts,
    });
})
export const getCartById = asyncHandler(async (req, res) => {
    const carts = await Cart.findById(req.params.id);
    res.json({
        status: "success",
        message: "carts fetched successfully",
        carts,
    });
})
export const getCartItemsByUser = asyncHandler(async (req, res) => {
    const carts = await Cart.find({
        user: req.userAuthId
    });
    res.json({
        status: "success",
        message: "carts fetched successfully",
        carts,
    });
});
export const deleteCart = asyncHandler(async (req, res) => {
    const carts = await Cart.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "carts deleted successfully",
        carts,
    });

})