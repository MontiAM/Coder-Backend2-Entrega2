import { ProductRequestDTO } from "../dtos/product.req.dto.js";
import { ProductResponseDTO } from "../dtos/product.res.dto.js";
import { productService } from "../services/product.service.js";

class ProductController {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res, next) => {
        try {
            const products = await this.service.getAll();
            products.map((p) => new ProductResponseDTO(p));
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await this.service.getById(id);
            res.status(200).json(new ProductResponseDTO(product));
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const productDTO = new ProductRequestDTO(req.body);
            const product = await this.service.create(productDTO);
            res.status(201).json(new ProductResponseDTO(product));
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await this.service.update(id, body);
            res.status(200).json(new ProductResponseDTO(product));
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await this.service.delete(id);
            res.status(200).json(new ProductResponseDTO(product));
        } catch (error) {
            next(error);
        }
    };
}

export const productController = new ProductController(productService);
