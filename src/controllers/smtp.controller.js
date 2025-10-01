import { smtpService } from "../services/smtp.service.js";

class SMTPController {
    resetPassword = async (req, res, next) => {
        try {
            const { email } = req.body;
            const response = await smtpService.resetPassword(email);
            res.json({
                message: "Correo enviado correctamente",
                info: response,
            });
        } catch (error) {
            next(error);
        }
    };

    confirmResetPassword = async (req, res, next) => {
        try {
            const { token, email } = req.query;
            const userEmail = await smtpService.confirmResetPassword(
                token,
                email
            );
            res.json({ valid: true, email: userEmail });
        } catch (error) {
            res.status(400).json({ valid: false, message: error.message });
        }
    };
    updatePassword = async (req, res, next) => {
        try {
            const { token, email, newPassword } = req.body;
            const response = await smtpService.updatePassword(
                token,
                email,
                newPassword
            );
            res.json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

export const smtpController = new SMTPController();
