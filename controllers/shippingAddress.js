import asyncHandler from "express-async-handler";
import shippingAddress from "../models/shippingAddress.js";
import users from "../models/users.js";

// @desc    Create new shippingAddress
// @route   POST /v1/shippingAddresss
export const getshippingAddressCtrl = asyncHandler(async (req, res) => {
    const shippingAddresss = await shippingAddress.find();
    res.json({
        status: "success",
        message: "shippingAddresss fetched successfully",
        shippingAddresss,
    });
})
export const getSingleshippingAddress = asyncHandler(async (req, res) => {
    const shippingAddresss = await shippingAddress.findById(req.params.id);
    res.json({
        status: "success",
        message: "shippingAddresss fetched successfully",
        shippingAddresss,
    });
});
export const createshippingAddressCtrl = asyncHandler(async (req, res) => {
    const {
        address,
        city,
        postalcode,
        province,
        country,
        phone
    } = req.body;

    const shipping_address = await shippingAddress.create({
        user: req.userAuthId,
        address: address,
        city: city,
        postalcode: postalcode,
        province: province,
        country: country,
        phone: phone
    });
    await users.findOneAndUpdate({
        _id: req.userAuthId
    }, {
        shippingAddress: shipping_address?._id
    }, {
        new: true
    });

    res.json({
        status: "success",
        message: "ShippingAddress created successfully",
        shipping_address,
    });
});
export const updateshippingAddressCtrl = asyncHandler(async (req, res) => {
    const {
        address,
        city,
        postalcode,
        province,
        country,
        phone
    } = req.body;

    //update
    const shipping_Address = await shippingAddress.findByIdAndUpdate(
        req.params.id, {
            address,
            city,
            postalcode,
            province,
            country,
            phone
        }, {
            new: true,
        }
    );
    res.json({
        status: "success",
        message: "shippingAddresss updated successfully",
        shipping_Address,
    });

})

export const deleteshippingAddressCtrl = asyncHandler(async (req, res) => {
    await shippingAddress.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "shippingAddress deleted successfully",
    });


})