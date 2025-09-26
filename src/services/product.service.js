import CustomError from "../utils/custom-error.js";
import { productRepository } from "../repositories/product.repository.js";

class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async getAll() {
        try {
            return await this.productRepository.getAll();
        } catch (error) {
            throw new CustomError("Product not found", 404);
        }
    }
    async getById(id) {
        try {
            return await this.productRepository.getById(id);
        } catch (error) {
            throw new CustomError("Product not found", 404);
        }
    }
    async create(body) {
        try {
            const exists = await this.productRepository.getByCode(body.code);
            if (exists) throw new CustomError("Code already exists", 400);
            const product = await this.productRepository.create(body);
            if (!product) throw new CustomError("Product creation failed", 400);
            return product;
        } catch (error) {
            throw new CustomError("Product creation failed", 400);
        }
    }
    async update(body, id) {
        try {
            const exists = await this.productRepository.getById(id);
            if (!exists) throw new CustomError("Product not found", 404);
            if (exists.code !== body.code) {
                const exists = await this.productRepository.getByCode(
                    body.code
                );
                if (exists) throw new CustomError("Code already exists", 400);
            }
            const product = await this.productRepository.update(id, body);
            if (!product)
                throw new CustomError("Product not found for update", 404);
            return product;
        } catch (error) {
            throw new CustomError("Product not found for update", 404);
        }
    }
    delete = async (id) => {
        try {
            const product = await this.productRepository.delete(id);
            if (!product)
                throw new CustomError("Product not found for deletion", 404);
            return product;
        } catch (error) {
            throw new CustomError("Product not found for deletion", 404);
        }
    };
}

export const productService = new ProductService(productRepository);
