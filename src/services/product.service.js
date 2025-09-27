import CustomError from "../utils/custom-error.js";
import { productRepository } from "../repositories/product.repository.js";

class ProductService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        try {
            return await this.repository.getAll();
        } catch (error) {
            throw new CustomError("Product not found", 404);
        }
    }
    async getById(id) {
        try {
            return await this.repository.getById(id);
        } catch (error) {
            throw new CustomError("Product not found", 404);
        }
    }
    async create(body) {
        try {
            const exists = await this.repository.getByCode(body.code);
            if (exists) throw new CustomError("Code already exists", 400);
            const product = await this.repository.create(body);
            if (!product) throw new CustomError("Product creation failed", 400);
            return product;
        } catch (error) {
            if (error instanceof CustomError) throw error; // 👈 respetar tus errores
            throw new CustomError("Unexpected error creating product", 500);
        }
    }
    async update(id, body) {
        try {
            const exists = await this.repository.getById(id);
            if (!exists) throw new CustomError("Product not found", 404);
            if (exists.code !== body.code) {
                const exists = await this.repository.getByCode(body.code);
                if (exists) throw new CustomError("Code already exists", 400);
            }
            const product = await this.repository.update(id, body);
            if (!product)
                throw new CustomError("Product not found for update", 404);
            return product;
        } catch (error) {
            throw new CustomError("Product not found for update", 404);
        }
    }
    delete = async (id) => {
        try {
            const product = await this.repository.delete(id);
            if (!product)
                throw new CustomError("Product not found for deletion", 404);
            return product;
        } catch (error) {
            throw new CustomError("Product not found for deletion", 404);
        }
    };
}

export const productService = new ProductService(productRepository);
