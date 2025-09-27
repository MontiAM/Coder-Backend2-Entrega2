import { productDao } from "../daos/product-dao.js";

class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = async () => {
        try {
            return await this.dao.getAll();
        } catch (error) {
            throw new Error(error);
        }
    };

    getById = async (id) => {
        try {
            return await this.dao.getById(id);
        } catch (error) {
            throw error;
        }
    };

    create = async (body) => {
        try {
            return await this.dao.create(body);
        } catch (error) {
            throw error;
        }
    };

    update = async (id, body) => {
        try {
            return await this.dao.update(id, body);
        } catch (error) {
            throw error;
        }
    };

    delete = async (id) => {
        try {
            return await this.dao.delete(id);
        } catch (error) {
            throw error;
        }
    };

    getByCode = async (code) => {
        try {
            return await this.dao.getByCode(code);
        } catch (error) {
            throw error;
        }
    };
}

export const productRepository = new ProductRepository(productDao);
