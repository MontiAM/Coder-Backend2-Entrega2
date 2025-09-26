import { model, Schema, Types } from "mongoose";

const cart = {
    products: [
        {
            product: {
                type: Types.ObjectId,
                ref: "Product",
                index: true,
            },
            quantity: {
                type: Number,
                min: 0,
            },
        },
    ],
};

const cartSchema = new Schema(cart);
export const CartModel = model("Cart", cartSchema);
