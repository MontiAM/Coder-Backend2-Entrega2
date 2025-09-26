import jwt from "jsonwebtoken";
import { userDao } from "../daos/user-dao.js";
import { cartDao } from "../daos/cart-dao.js";
import CustomError from "../utils/custom-error.js";
import { createHash, isValidPassword } from "../utils/user-utils.js";
import { JWT_SECRET } from "../config/config.js";

class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    register = async (body) => {
        try {
            const { email, password } = body;
            const existsUser = await this.dao.getUserByEmail(email);

            if (existsUser) throw new CustomError("El usuario ya existe", 400);

            const newCart = await cartDao.create({ products: [] });

            const response = await this.dao.create({
                ...body,
                password: createHash(password),
                cart: newCart._id,
            });
            if (!response)
                throw new CustomError("Error al registrar al usuario", 400);
            return response;
        } catch (error) {
            throw error;
        }
    };

    login = async (email, password) => {
        try {
            const existsUser = await this.dao.getUserByEmail(email);
            if (!existsUser)
                throw new CustomError("Credenciales incorrectas", 400);
            const passValid = isValidPassword(password, existsUser.password);
            if (!passValid)
                throw new CustomError("Credenciales incorrectas", 400);
            return existsUser;
        } catch (error) {
            throw error;
        }
    };
    generateToken = (user) => {
        const token = jwt.sign(
            {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                cart: user.cart,
            },
            JWT_SECRET,
            { expiresIn: "15m" }
        );
        return token;
    };

    generateRefreshToken = (user) => {
        const token = jwt.sign(
            {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: "24h" }
        );
        return token;
    };
}

export const userRepository = new UserRepository(userDao);
