//product schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products",
    },

}, {
    timestamps: true,
});


const Carts = mongoose.model("carts", CartSchema);

export default Carts;