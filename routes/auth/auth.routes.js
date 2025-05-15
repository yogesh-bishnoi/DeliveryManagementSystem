import { Router } from "express";
import { signUp, signIn } from "../../controllers/Auth.controller.js";
import { handleValidationErrors, signUpValidation, signInValidation } from "../../middlewares/validatorMiddleware.js";
const authRoutes = Router();

authRoutes.post("/signUp", [handleValidationErrors(signUpValidation)], signUp);
authRoutes.post("/signIn", [handleValidationErrors(signInValidation)], signIn);

export default authRoutes;