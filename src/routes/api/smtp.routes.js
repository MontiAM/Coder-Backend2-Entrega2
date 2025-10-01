import { Router } from "express";
import { smtpController } from "../../controllers/smtp.controller.js";

const router = Router();

router.post("/reset-password", smtpController.resetPassword);
router.get("/confirm-reset-password", smtpController.confirmResetPassword);
router.post("/update-password", smtpController.updatePassword);

export default router;
