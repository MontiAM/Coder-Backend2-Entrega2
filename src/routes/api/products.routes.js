import { Router } from "express";
import { productController } from "../../controllers/product.controller.js";
import { verifyObjectId } from "../../middlewares/verify-objectid.js";
import { passportCall } from "../../middlewares/passport/passport-call.js";
import { handlePolicies } from "../../middlewares/policies-handler.js";

const router = Router();

router.use(passportCall("jwtCookies"), handlePolicies(["user"]));

router.get(
    "/",
    passportCall("jwtCookies"),
    handlePolicies(["user", "admin"]),
    productController.getAll
);
router.get(
    "/:id",
    passportCall("jwtCookies"),
    handlePolicies(["user", "admin"]),
    verifyObjectId(["id"]),
    productController.getById
);
router.post(
    "/",
    passportCall("jwtCookies"),
    handlePolicies(["admin"]),
    productController.create
);
router.put(
    "/:id",
    passportCall("jwtCookies"),
    handlePolicies(["admin"]),
    verifyObjectId(["id"]),
    productController.update
);
router.delete(
    "/:id",
    passportCall("jwtCookies"),
    handlePolicies(["admin"]),
    verifyObjectId(["id"]),
    productController.delete
);

export default router;
