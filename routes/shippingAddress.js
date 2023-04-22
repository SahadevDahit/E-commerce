import exppress from "express";
import {
    createshippingAddressCtrl,
    updateshippingAddressCtrl,
    deleteshippingAddressCtrl,
    getshippingAddressCtrl,
    getSingleshippingAddress
} from "../controllers/shippingAddress.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const shippingAddressRouter = exppress.Router();
shippingAddressRouter.get('/', getshippingAddressCtrl);
shippingAddressRouter.get('/:id', getSingleshippingAddress);
shippingAddressRouter.put('/:id', isLoggedIn, updateshippingAddressCtrl);
shippingAddressRouter.delete('/:id', isLoggedIn, deleteshippingAddressCtrl);

shippingAddressRouter.post("/", isLoggedIn, createshippingAddressCtrl);

export default shippingAddressRouter;