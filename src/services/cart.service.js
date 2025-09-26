import { cartRepository } from "../repositories/cart.repository";

class CartService {
    constructor(repository) {
        this.repository = repository;
    }
    getAll = async () => {
        return await this.repository.getAll();
    };

    getById = async (id) => {
        return await this.repository.findById(id);
    };

    create = async (cart) => {
        return await this.repository.create(cart);
    };

    delete = async (id, deleteCart = "false") => {
        let result;
        if (deleteCart === "true") {
            result = await this.repository.delete(id);
        } else {
            result = await this.repository.clearCart(id);
        }
        return result;
    };

    addProductToCart = async (cartId, productId, quantity) => {
        const cart = await this.repository.findById(cartId);
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
        return await this.repository
            .findById(cartId)
            .populate("products.product");
    };

    updateProductsToCart = async (cartId, products) => {
        await this.delete(cartId);
        for (const product of products) {
            await this.addProductToCart(cartId, product._id, product.quantity);
        }
        return await this.repository
            .findById(cartId)
            .populate("products.product");
    };

    removeProductFromCart = async (cid, pid) => {
        return await this.repository.updateOne(
            { _id: cid },
            { $pull: { products: { product: pid } } }
        );
    };
}

export const cartService = new CartService(cartRepository);
