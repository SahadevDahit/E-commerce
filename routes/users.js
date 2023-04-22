import exppress from "express";
import upload from "../config/multer.js";
import {
    registerUserCtrl,
    loginUserCtrl,
    getUserProfileCtrl,
    updateUserProfileCtrl,
} from "../controllers/users.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";
const userRoutes = exppress.Router();
userRoutes.post("/", upload.single("file"), registerUserCtrl);

userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile", isLoggedIn, getUserProfileCtrl);
//update user profile
userRoutes.put("/profile", isLoggedIn, updateUserProfileCtrl);


export default userRoutes;