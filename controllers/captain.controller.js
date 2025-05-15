import { asyncHandler } from "../utils/asyncHandler.js";
import calculateCaptainPayment from "../utils/paymentHandler.js";
import { GenerateRouteId } from "../utils/authHandler.js";
import config from "../config/config.js";

// Active 
const activeORinactive = asyncHandler(async (req, res) => {
    const { status } = req.body;
    await db.User.findByIdAndUpdate(req.userId, { status: status });
    return res.status(200).json({ success: true, message: `Id ${status} successfully!` });
})

// Pick order
const pickOrder = asyncHandler(async (req, res) => {
    const { orderId, location } = req.body;
    const order = await db.Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found!" });
    }
    if (order.orderStatus !== config.ORDER_STATUS.PENDING) {
        return res.status(404).json({ success: false, message: "Order is already is process or completed!" });
    }
    await db.Order.findByIdAndUpdate(order._id, { orderStatus: config.ORDER_STATUS.DISPATCHED, deliveryManId: req.userId });
    const routeId = await GenerateRouteId();
    await db.Route.create({ routeId: routeId, captainId: req.userId, orderId: orderId, steps: [{ location: location, timestamp: new Date().toISOString() }], status: config.ROUTE_STATUS.IN_PROGRESS });
    return res.status(200).json({ success: true, message: "Order picked!" })
})

// update route steps
const addSteps = asyncHandler(async (req, res) => {
    const { routeId, location } = req.body;
    const route = await db.Route.findById(routeId);
    if (!route) {
        return res.status(404).json({ success: false, message: "Route not found!" });
    }
    if (route.status === config.ROUTE_STATUS.COMPLETED) {
        return res.status(401).json({ success: false, message: "Route already completed!" });
    }
    route.steps.push({ location: location, timestamp: new Date().toISOString() });
    await route.save();
    return res.status(200).json({ success: true, message: "Route updated successfully!" })
})

// Order delivered
const orderDelivered = asyncHandler(async (req, res) => {
    const { orderId } = req.body;
    const order = await db.Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found!" });
    }
    await db.Order.findByIdAndUpdate(order._id, { orderStatus: config.ORDER_STATUS.DELIVERED });
    return res.status(200).json({ success: true, message: "Order delivered successfully!" })
})

// Calculate payment 
const captainPayment = asyncHandler(async (req, res) => {
    const totalIncome = await calculateCaptainPayment(req.userId);
    return res.status(200).json({ success: true, message: "Payment history found successfully!", data: totalIncome });
})

// orders
const orders = asyncHandler(async (req, res) => {
    const orders = await db.Order.find({ orderStatus: config.ORDER_STATUS.PENDING }, { _id: 1, orderId: 1, deliveryAddress: 1 });
    return res.status(200).json({ success: true, message: "Orders found successfully!", data: orders });
})

export {
    activeORinactive,
    pickOrder,
    addSteps,
    orderDelivered,
    captainPayment,
    orders
}