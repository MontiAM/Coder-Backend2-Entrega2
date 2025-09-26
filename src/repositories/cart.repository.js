import { cartDao } from "../daos/cart-dao.js";
import CustomError from "../utils/custom-error.js";

class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = async () => {
        return await this.dao.model.find().populate("products.product");
    };

    getById = async (id) => {
        return await this.dao.model.findById(id).populate("products.product");
    };

    create = async (cart) => {
        return await this.dao.model.create(cart);
    };

    delete = async (id) => {
        return await this.dao.model.findByIdAndDelete(id);
    };

    clearCart = async (id) => {
        return await this.dao.model.findByIdAndUpdate(
            id,
            { products: [] },
            { new: true }
        );
    };

    addProductToCart = async (cartId, productId, quantity) => {
        const cart = await this.dao.model.findById(cartId);
        if (!cart) throw new CustomError("Cart not found", 404);

        const existingProduct = cart.products.find(
            (p) => p.product.toString() === productId.toString()
        );

        if (existingProduct) {
            existingProduct.quantity = quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        return await this.dao.model
            .findById(cartId)
            .populate("products.product");
    };

    updateProductsToCart = async (cartId, products) => {
        await this.delete(cartId);
        for (const product of products) {
            await this.addProductToCart(cartId, product._id, product.quantity);
        }
        return await this.dao.model
            .findById(cartId)
            .populate("products.product");
    };

    removeProductFromCart = async (cid, pid) => {
        return await this.dao.model.updateOne(
            { _id: cid },
            { $pull: { products: { product: pid } } }
        );
    };
}

export const cartRepository = new CartRepository(cartDao);
