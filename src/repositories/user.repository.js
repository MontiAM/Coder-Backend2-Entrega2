import { userDao } from "../daos/user-dao.js";

class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getUserByEmail = async (email) => {
        return await this.dao.getUserByEmail(email);
    };

    create = async (userData) => {
        return await this.dao.create(userData);
    };
    update = async (id, updatedData) => {
        return await this.dao.update(id, updatedData);
    };
}

export const userRepository = new UserRepository(userDao);
