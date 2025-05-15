// Async wrapper for functions that return a promise
export const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
}
