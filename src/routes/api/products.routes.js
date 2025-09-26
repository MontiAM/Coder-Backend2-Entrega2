import { Router } from "express";
import { productController } from "../../controllers/product.controller.js";
import { verifyObjectId } from "../../middlewares/verify-objectid.js";
import { passportCall } from "../../middlewares/passport/passport-call.js";
import { handlePolicies } from "../../middlewares/handlerPolices.js";

const router = Router();

router.use(passportCall("jwtCookies"), handlePolicies(["user"]));

router.get("/", productController.getAll);
router.get("/:id", verifyObjectId(["id"]), productController.getById);
router.post("/", productController.create);
router.put("/:id", verifyObjectId(["id"]), productController.update);
router.delete("/:id", verifyObjectId(["id"]), productController.delete);

export default router;
