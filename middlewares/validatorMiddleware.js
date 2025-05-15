import Joi from "joi";
import config from "../config/config.js";

// Handle validation in routes
export const handleValidationErrors = (validationFunction, type = "BODY") => {
    return (req, res, next) => {
        const parameter = type === "BODY" ? req.body : req.query
        const { error } = validationFunction(parameter);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        next();
    };
};

// validate schema for sign up
export const signUpValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required()
            .messages({
                "string.empty": "Name is required!",
                "string.min": "Name must be at least 3 characters!",
                "string.max": "Name must be at most 50 characters!",
            }),

        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.empty": "Email is required!",
                "string.email": "Email must be a valid email address!",
            }),

        phone: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                "string.empty": "Phone number is required!",
                "string.pattern.base": "Phone number must be exactly 10 digits!",
            }),

        role: Joi.string()
            .valid(config.ROLE.ADMIN, config.ROLE.CAPTAIN, config.ROLE.USER)
            .required()
            .messages({
                "any.only": "Role must be one of: ADMIN, CAPTAIN, USER",
                "string.empty": "Role is required!",
            }),

        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/)
            .required()
            .messages({
                "string.empty": "Password is required!",
                "string.pattern.base":
                    "Password must be 6–15 characters long, with at least one uppercase, one lowercase, one number, and one special character!",
            }),
    }).unknown(); // Allow extra fields if needed (like from frontend)

    return schema.validate(data);
};

// Validate schema for sign-in
export const signInValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.empty": "Email is required!",
                "string.email": "Email must be a valid email address!",
            }),

        role: Joi.string()
            .valid(config.ROLE.ADMIN, config.ROLE.CAPTAIN, config.ROLE.USER)
            .required()
            .messages({
                "any.only": "Role must be one of: ADMIN, CAPTAIN, USER",
                "string.empty": "Role is required!",
            }),

        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/)
            .required()
            .messages({
                "string.empty": "Password is required!",
                "string.pattern.base":
                    "Password must be 6–15 characters long, with at least one uppercase, one lowercase, one number, and one special character!",
            }),
    });

    return schema.validate(data);
};

// Validate schema for caption status
export const captainStatusValidation = (data) => {
    const schema = Joi.object({
        status: Joi.string()
            .valid(config.CAPTAIN_STATUS.ACTIVE, config.CAPTAIN_STATUS.INACTIVE)
            .required()
            .messages({
                "any.only": "Status must be one of: ACTIVE, INACTIVE",
                "string.empty": "Status is required!",
            }),
    });

    return schema.validate(data);
};

// Validate schema for pick order
export const pickOrderValidation = (data) => {
    const schema = Joi.object({
        orderId: Joi.string()
            .required()
            .messages({
                "string.empty": "Order ID is required!",
            }),

        location: Joi.string()
            .required()
            .messages({
                "string.empty": "Location is required!",
            }),
    });

    return schema.validate(data);
};

// Validate schema for add step
export const addStepValidation = (data) => {
    const schema = Joi.object({
        routeId: Joi.string()
            .required()
            .messages({
                "string.empty": "Route ID is required!",
            }),

        location: Joi.string()
            .required()
            .messages({
                "string.empty": "Location is required!",
            }),
    });

    return schema.validate(data);
};

// Validate schema for order deliver
export const orderDeliveredValidation = (data) => {
    const schema = Joi.object({
        orderId: Joi.string()
            .required()
            .messages({
                "string.empty": "Order ID is required!",
            }),
    });

    return schema.validate(data);
};

// Validate schema for place order
export const placeOrderValidation = (data) => {
    const schema = Joi.object({
        productId: Joi.string()
            .required()
            .messages({
                "string.empty": "Product ID is required!",
            }),

        address: Joi.string()
            .required()
            .messages({
                "string.empty": "Delivery address is required!",
            }),
    });

    return schema.validate(data);
};

// Validate schema for cancel order
export const cancelOrderValidation = (data) => {
    const schema = Joi.object({
        orderId: Joi.string()
            .required()
            .messages({
                "string.empty": "Order ID is required!",
            }),
    });

    return schema.validate(data);
};

// Validate schema for cancel order
export const adminCaptainPaymentValidation = (data) => {
    const schema = Joi.object({
        captainId: Joi.string()
            .required()
            .messages({
                "string.empty": "Captain ID is required!",
            }),
    });

    return schema.validate(data);
};

// Validation for product add on
export const addProductValidation = (data) => {
    const schema = Joi.object({
        productName: Joi.string()
            .required()
            .messages({
                "string.empty": "Product name is required!",
            }),
        description: Joi.string()
            .required()
            .messages({
                "string.empty": "Description is required!",
            }),
        price: Joi.number()
            .positive()
            .required()
            .messages({
                'number.base': 'Price must be a number',
                'number.positive': 'Price must be greater than 0',
                'any.required': 'Price is required'
            })
    });

    return schema.validate(data);
};