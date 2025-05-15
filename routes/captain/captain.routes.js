import { Router } from "express";
import { activeORinactive, pickOrder, addSteps, orderDelivered, captainPayment, orders } from "../../controllers/captain.controller.js"
import { handleValidationErrors, captainStatusValidation, pickOrderValidation, addStepValidation, orderDeliveredValidation } from "../../middlewares/validatorMiddleware.js";
import { preventMultipleRequests } from "../../utils/filterHandler.js";
import { authJwt, authorizeRole } from "../../middlewares/jwtMiddleware.js";
import config from "../../config/config.js";
const captainRoutes = Router();

captainRoutes.post("/activeORinactive", [authJwt, authorizeRole(config.ROLE.CAPTAIN), handleValidationErrors(captainStatusValidation)], preventMultipleRequests(activeORinactive));
captainRoutes.post("/pickOrder", [authJwt, authorizeRole(config.ROLE.CAPTAIN), handleValidationErrors(pickOrderValidation)], preventMultipleRequests(pickOrder));
captainRoutes.post("/addSteps", [authJwt, authorizeRole(config.ROLE.CAPTAIN), handleValidationErrors(addStepValidation)], preventMultipleRequests(addSteps));
captainRoutes.post("/orderDelivered", [authJwt, authorizeRole(config.ROLE.CAPTAIN), handleValidationErrors(orderDeliveredValidation)], preventMultipleRequests(orderDelivered));
captainRoutes.get("/captainPayment", [authJwt, authorizeRole(config.ROLE.CAPTAIN)], preventMultipleRequests(captainPayment));
captainRoutes.get("/orders", [authJwt, authorizeRole(config.ROLE.CAPTAIN)], preventMultipleRequests(orders));

export default captainRoutes;