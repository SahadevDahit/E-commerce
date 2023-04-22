import exppress from "express";
import {
    createProductCtrl,
    getProductsCtrl,
    getProductCtrl,
    updateProductCtrl,
    deleteProductCtrl,
} from "../controllers/products.js";
import upload from "../config/multer.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const productsRouter = exppress.Router();

productsRouter.post(
    "/",
    isLoggedIn,
    isAdmin,
    upload.array("files", 3),
    createProductCtrl
);

productsRouter.get("/", getProductsCtrl);
productsRouter.get("/:id", getProductCtrl);
productsRouter.put("/:id", isLoggedIn, isAdmin, updateProductCtrl);
productsRouter.delete("/:id", isLoggedIn, isAdmin, deleteProductCtrl);
export default productsRouter;