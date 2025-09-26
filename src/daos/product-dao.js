import MongoDao from "./mongo-dao.js";
import { ProductModel } from "./models/product-model.js";

class ProductMongoDao extends MongoDao {
    constructor(model) {
        super(model);
    }

    getByCode = async (code) => {
        try {
            return await this.model.findOne({ code: code });
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const productDao = new ProductMongoDao(ProductModel);
