import { Router } from "express";
import { passportCall } from "../../middlewares/passport/passport-call.js";
import { sessionController } from "../../controllers/sessions.controller.js";

const router = Router();

router.use(passportCall("jwtCookies"));

router.get("/current", sessionController.current);

export default router;
