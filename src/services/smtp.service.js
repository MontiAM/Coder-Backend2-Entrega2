import {
    emailResetPassword,
    transporter,
} from "../config/smtp/nodemailer.config.js";
import { userService } from "./user.service.js";
import { SERVER_PORT, JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
import { createHash, isValidPassword } from "../utils/user-utils.js";

class SMTPService {
    resetPassword = async (email) => {
        try {
            const user = await userService.getUserByEmail(email);
            if (!user) throw new Error("El usuario no existe");

            const token = userService.generateToken(user);
            const resetUrl = `http://localhost:${SERVER_PORT}/api/smtp/confirm-reset-password?token=${token}&email=${email}`;

            return await transporter.sendMail(
                emailResetPassword(email, resetUrl)
            );
        } catch (error) {
            throw new Error(error);
        }
    };
    confirmResetPassword = async (token, email) => {
        if (!token) throw new Error("Token no proporcionado");

        const payload = jwt.verify(token, JWT_SECRET);
        if (payload.email !== email)
            throw new Error("Token inválido para este email");

        return payload.email;
    };
    updatePassword = async (token, email, newPassword) => {
        const userEmail = await this.confirmResetPassword(token, email);

        const user = await userService.getUserByEmail(userEmail);
        if (!user) throw new Error("Usuario no encontrado");

        const isSamePassword = isValidPassword(newPassword, user.password);
        if (isSamePassword)
            throw new Error(
                "La nueva contraseña no puede ser igual a la anterior"
            );

        const hashedPassword = createHash(newPassword);
        await userService.updatePassword(userEmail, hashedPassword);

        return { message: "Contraseña restablecida con éxito" };
    };
}

export const smtpService = new SMTPService();
