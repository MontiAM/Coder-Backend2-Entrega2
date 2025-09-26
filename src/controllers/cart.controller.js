// controllers/cart.controller.js
import { cartService } from "../services/cart.service.js";

class CartController {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res, next) => {
        try {
            const carts = await this.service.getAll();
            res.json(carts);
        } catch (err) {
            next(err);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const cart = await this.service.getById(cid);
            res.json(cart);
        } catch (err) {
            next(err);
        }
    };

    create = async (req, res, next) => {
        try {
            const cart = await this.service.create(req.body);
            res.status(201).json(cart);
        } catch (err) {
            next(err);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const { deleteCart = "false" } = req.query;
            const result = await this.service.delete(cid, deleteCart);
            res.json(result);
        } catch (err) {
            next(err);
        }
    };

    addProductToCart = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const result = await this.service.addProductToCart(
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
            const result = await this.service.updateProductsToCart(
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
            const result = await this.service.removeProductFromCart(cid, pid);
            res.json(result);
        } catch (err) {
            next(err);
        }
    };
}

export const cartController = new CartController(cartService);
