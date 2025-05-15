import { asyncHandler } from './asyncHandler.js';
const activeRequests = new Map();

// Function for data filter
const getFilterOptions = (req, parameters, manualFilters = {}) => {
    let options = { ...manualFilters }; // Include manual filters by default

    // Dynamic filtering based on query parameters
    parameters.forEach((param) => {
        if (req.query[param] !== undefined && req.query[param] !== "") {
            options[param] = req.query[param];
        }
    });

    // Date range filtering
    if (req.query.startDate || req.query.endDate) {
        options.createdAt = {};

        if (req.query.startDate) {
            const startDate = new Date(req.query.startDate);
            if (!isNaN(startDate)) {
                options.createdAt.$gte = startDate;
            }
        }

        if (req.query.endDate) {
            const endDate = new Date(req.query.endDate);
            if (!isNaN(endDate)) {
                options.createdAt.$lte = endDate;
            }
        }
    }

    return options;
};

// Function for pagination
const getPaginationOptions = (req) => {
    let options = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    options.skip = (page - 1) * limit; // Calculate the skip value
    options.limit = limit;
    return options;
};

// Prevent multiple requests
const preventMultipleRequests = (handler) =>
    asyncHandler(async (req, res, next) => {
        const userId = req.userId;

        if (activeRequests.get(userId)) {
            return res.status(429).json({
                success: false,
                message: "Your request is already in progress. Please wait.",
            });
        }

        activeRequests.set(userId, true);
        try {
            await handler(req, res, next);
        } finally {
            activeRequests.delete(userId);
        }
    });

export {
    getFilterOptions,
    getPaginationOptions,
    preventMultipleRequests
}