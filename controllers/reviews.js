import asyncHandler from "express-async-handler";
import Product from "../models/products.js";
import Review from "../models/reviews.js";

// @desc    Create new review
// @route   POST /api/v1/reviews
// @access  Private/Admin
export const getReviewCtrl = asyncHandler(async (req, res) => {

    const reviews = await Review.find();
    res.json({
        status: "success",
        message: "Reviews fetched successfully",
        reviews,
    });

})
export const getSingleReview = asyncHandler(async (req, res) => {
    const reviews = await Review.findById(req.params.id);
    res.json({
        status: "success",
        message: "reviews fetched successfully",
        reviews,
    });
});
export const createReviewCtrl = asyncHandler(async (req, res) => {
    const {
        message,
        rating
    } = req.body;
    //1. Find the product
    const {
        productID
    } = req.params;
    const productFound = await Product.findById(productID).populate("reviews");
    if (!productFound) {
        throw new Error("Product Not Found");
    }
    let reviewCount = 0;

    //check if user already reviewed this product
    productFound?.reviews?.find((review) => {
        if (review?.user?.toString() === req?.userAuthId?.toString()) {
            ++reviewCount;
        }
        return null;
    });
    if (reviewCount >= 3) {
        throw new Error("You have already reviewed three times this product");
    }

    //create review
    const review = await Review.create({
        message,
        rating,
        product: productFound?._id,
        user: req.userAuthId,
    });
    //Push review into product Found
    productFound.reviews.push(review?._id);
    //resave
    await productFound.save();
    res.status(201).json({
        success: true,
        message: "Review created successfully",
    });
});
export const updateReviewCtrl = asyncHandler(async (req, res) => {
    const {
        message,
        rating
    } = req.body;

    //update
    const reviews = await Review.findByIdAndUpdate(
        req.params.id, {
            message,
            rating,
        }, {
            new: true,
        }
    );
    res.json({
        status: "success",
        message: "reviews updated successfully",
        reviews,
    });

})

export const deleteReviewCtrl = asyncHandler(async (req, res) => {
    await Review.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Review deleted successfully",
    });


})