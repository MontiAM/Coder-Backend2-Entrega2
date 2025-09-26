import { cartRepository } from "../repositories/cart.repository.js";
import CustomError from "../utils/custom-error.js";

class CartController {
    getAll = async (req, res, next) => {
        try {
            const carts = await cartRepository.getAll();
            res.json(carts);
        } catch (err) {
            next(err);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const cart = await cartRepository.getById(cid);
            if (!cart) throw new CustomError("Cart not found", 404);
            res.json(cart);
        } catch (err) {
            next(err);
        }
    };

    create = async (req, res, next) => {
        try {
            const cart = await cartRepository.create(req.body);
            res.status(201).json(cart);
        } catch (err) {
            next(err);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const { deleteCart = "false" } = req.query;
            const result = await cartRepository.delete(cid, deleteCart);
            res.json(result);
        } catch (err) {
            next(err);
        }
    };

    addProductToCart = async (req, res, next) => {
        console.log(req.body);

        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const result = await cartRepository.addProductToCart(
                cid,
                pid,
                quantity
            );
            res.json(result);
        } catch (err) {
            next(err);
        }
    };

    updateProductsToCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const products = Array.isArray(req.body)
                ? req.body
                : req.body.products;
            const result = await cartRepository.updateProductsToCart(
                cid,
                products
            );
            res.json(result);
        } catch (err) {
            next(err);
        }
    };

    removeProductFromCart = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const result = await cartRepository.removeProductFromCart(cid, pid);
            res.json(result);
        } catch (err) {
            next(err);
        }
    };
}

export const cartController = new CartController();
