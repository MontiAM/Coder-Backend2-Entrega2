import MongoDao from "./mongo-dao.js";
import { UserModel } from "./models/user-model.js";

class UserMongoDao extends MongoDao {
    constructor(model) {
        super(model);
    }
    getUserByEmail = async (email) => {
        try {
            return await this.model.findOne({ email: email });
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const userDao = new UserMongoDao(UserModel);
