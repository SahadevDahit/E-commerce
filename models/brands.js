//Brand schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    }, ],
}, {
    timestamps: true
});

const Brand = mongoose.model("brands", BrandSchema);

export default Brand;