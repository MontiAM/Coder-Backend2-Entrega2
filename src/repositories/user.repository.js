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
}

export const userRepository = new UserRepository(userDao);
