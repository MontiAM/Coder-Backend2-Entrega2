import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";
import { cartRepository } from "../repositories/cart.repository.js";
import CustomError from "../utils/custom-error.js";
import { createHash, isValidPassword } from "../utils/user-utils.js";
import { JWT_SECRET } from "../config/config.js";

class UserService {
    constructor(userRepository, cartrepository) {
        this.userRepository = userRepository;
        this.cartrepository = cartrepository;
    }

    register = async (body) => {
        try {
            const { email, password } = body;
            const existsUser = await this.userRepository.getUserByEmail(email);

            if (existsUser) throw new CustomError("El usuario ya existe", 400);

            const newCart = await this.cartrepository.create({ products: [] });

            const response = await this.userRepository.create({
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
            const existsUser = await this.userRepository.getUserByEmail(email);
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
    updatePassword = async (email, newHashedPassword) => {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) throw new CustomError("Usuario no encontrado", 404);

            user.password = newHashedPassword;
            const updatedUser = await this.userRepository.update(
                user._id,
                user
            );

            return updatedUser;
        } catch (error) {
            throw error;
        }
    };
    getUserByEmail = async (email) => {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            return user;
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

export const userService = new UserService(userRepository, cartRepository);
