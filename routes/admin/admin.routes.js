import { Router } from "express";
import { addProduct, captainPayment } from "../../controllers/Admin.controller.js";
import { handleValidationErrors, addProductValidation, adminCaptainPaymentValidation } from "../../middlewares/validatorMiddleware.js";
import { preventMultipleRequests } from "../../utils/filterHandler.js";
import { authJwt, authorizeRole } from "../../middlewares/jwtMiddleware.js";
import config from "../../config/config.js";
const adminRoutes = Router();

adminRoutes.post("/addProduct", [authJwt, authorizeRole(config.ROLE.ADMIN), handleValidationErrors(addProductValidation)], preventMultipleRequests(addProduct));
adminRoutes.post("/adminCaptainPayment", [authJwt, authorizeRole(config.ROLE.ADMIN), handleValidationErrors(adminCaptainPaymentValidation)], preventMultipleRequests(captainPayment));

export default adminRoutes;