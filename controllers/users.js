import users from "../models/users.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

import bcrypt from "bcryptjs";
export const registerUserCtrl = asyncHandler(async (req, res) => {
    let {
        email,
    } = req.body;
    // Check user exists
    const userExists = await users.findOne({
        email
    });
    if (userExists) {
        //throw
        throw new Error("User already exists");
    }
    const profile = await cloudinary.uploader.upload(req.file.path, {
        folder: 'user'
    });
    //create the user
    const registerUser = await users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        avatarUrl: profile.secure_url,
        avatarId: profile.public_id

    })
    return res.status(200).json({
        data: registerUser
    })
})
export const loginUserCtrl = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    //Find the user in db by email only
    const userFound = await users.findOne({
        email,
    });
    if (userFound && (await bcrypt.compare(password, userFound?.password))) {
        res.json({
            status: "success",
            message: "User logged in successfully",
            userFound,
            token: generateToken(userFound?._id),
        });
    } else {
        throw new Error("Invalid login credentials");
    }
});
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
    //find the user
    const user = await users.findById(req.userAuthId).populate("shippingAddress");
    res.json({
        status: "success",
        message: "User profile fetched successfully",
        user,
    });
});

export const updateUserProfileCtrl = asyncHandler(async (req, res) => {
    let user = await users.findOneAndUpdate({
        _id: req.userAuthId
    }, req.body, {
        new: true
    });
    res.json({
        status: "success",
        message: "User profile fetched successfully",
        user,
    });
});