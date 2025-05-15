import { Router } from "express";
import { placeOrder, cancelOrder, orderHistory, products } from "../../controllers/order.controller.js"
import { handleValidationErrors, placeOrderValidation, cancelOrderValidation } from "../../middlewares/validatorMiddleware.js";
import { preventMultipleRequests } from "../../utils/filterHandler.js";
import { authJwt, authorizeRole } from "../../middlewares/jwtMiddleware.js";
import config from "../../config/config.js";
const userRoutes = Router();

userRoutes.post("/placeOrder", [authJwt, authorizeRole(config.ROLE.USER), handleValidationErrors(placeOrderValidation)], preventMultipleRequests(placeOrder));
userRoutes.post("/cancelOrder", [authJwt, authorizeRole(config.ROLE.USER), handleValidationErrors(cancelOrderValidation)], preventMultipleRequests(cancelOrder));
userRoutes.get("/orderHistory", [authJwt, authorizeRole(config.ROLE.USER)], preventMultipleRequests(orderHistory));
userRoutes.get("/products", [authJwt, authorizeRole(config.ROLE.USER)], preventMultipleRequests(products));

export default userRoutes;