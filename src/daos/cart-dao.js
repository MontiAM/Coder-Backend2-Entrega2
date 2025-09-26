import MongoDao from "./mongo-dao.js";
import { CartModel } from "./models/cart-model.js";

class CartMongoDao extends MongoDao {
    constructor(model) {
        super(model);
    }
}

export const cartDao = new CartMongoDao(CartModel);
