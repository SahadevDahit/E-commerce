import exppress from "express";
import {
    getCart,
    createCart,
    deleteCart,
    getCartItemsByUser,
    getCartById
} from "../controllers/carts.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const CartRouter = exppress.Router();
CartRouter.get('/', isLoggedIn, getCart);
CartRouter.get('/user', isLoggedIn, getCartItemsByUser);
CartRouter.get('/:id', isLoggedIn, getCartById);
CartRouter.delete('/:id', isLoggedIn, deleteCart);

CartRouter.post("/", isLoggedIn, createCart);

export default CartRouter;