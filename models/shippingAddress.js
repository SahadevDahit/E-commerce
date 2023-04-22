import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ShippingAddressSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    province: {
        type: String,
    },
    country: {
        type: String,
    },
    phone: {
        type: String,
    },
});

//compile the schema to model
const shippingAddress = mongoose.model("shippingAddress", ShippingAddressSchema);

export default shippingAddress;