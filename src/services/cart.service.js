// services/cart.service.js
import { cartRepository } from "../repositories/cart.repository.js";
import CustomError from "../utils/custom-error.js";

class CartService {
    getAll = async () => {
        return await cartRepository.getAll();
    };

    getById = async (cid) => {
        const cart = await cartRepository.getById(cid);
        if (!cart) throw new CustomError("Cart not found", 404);
        return cart;
    };

    create = async (data) => {
        return await cartRepository.create(data);
    };

    delete = async (cid, deleteCart = "false") => {
        const result = await cartRepository.delete(cid, deleteCart);
        if (!result) throw new CustomError("Cart not found", 404);
        return result;
    };

    addProductToCart = async (cid, pid, quantity) => {
        if (!quantity || quantity <= 0) {
            throw new CustomError("Quantity must be greater than zero", 400);
        }

        const cart = await cartRepository.getById(cid);
        if (!cart) throw new CustomError("Cart not found", 404);

        return await cartRepository.addProductToCart(cid, pid, quantity);
    };

    updateProductsToCart = async (cid, products) => {
        if (!Array.isArray(products)) {
            throw new CustomError("Products must be an array", 400);
        }

        for (const p of products) {
            if (!p.quantity || p.quantity <= 0) {
                throw new CustomError(
                    "Each product must have a quantity greater than zero",
                    400
                );
            }
        }

        const cart = await cartRepository.getById(cid);
        if (!cart) throw new CustomError("Cart not found", 404);

        return await cartRepository.updateProductsToCart(cid, products);
    };

    removeProductFromCart = async (cid, pid) => {
        const cart = await cartRepository.getById(cid);
        if (!cart) throw new CustomError("Cart not found", 404);

        return await cartRepository.removeProductFromCart(cid, pid);
    };
}

export const cartService = new CartService();
