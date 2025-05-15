import { asyncHandler } from "../utils/asyncHandler.js";
import { GenerateOrderId } from "../utils/authHandler.js";
import config from "../config/config.js";


// Place order
const placeOrder = asyncHandler(async (req, res) => {
    const { productId, address } = req.body;
    const product = await db.Product.findById(productId);
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found!" });
    }
    const orderId = await GenerateOrderId();
    await db.Order.create({
        orderId: orderId,
        customerId: req.userId,
        deliveryAddress: address,
        totalAmount: product.price
    });
    return res.status(201).json({ success: true, message: "Order placed successfully!" });
})

// Cancel order
const cancelOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.body;
    const order = await db.Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found!" });
    }
    await db.Order.findByIdAndUpdate(order._id, { orderStatus: config.ORDER_STATUS.CANCELED });
    return res.status(200).json({ success: true, message: "Order canceled successfully!" })
})

// Order History
const orderHistory = asyncHandler(async (req, res) => {
    const orders = await db.Order.find({ customerId: req.userId });
    return res.status(200).json({ success: true, message: "Order history retrieved successfully!", data: orders });
})

// Products
const products = asyncHandler(async (req, res) => {
    const products = await db.Product.find();
    return res.status(200).json({ success: true, message: "Products found successfully!", data: products });
})

export {
    placeOrder,
    cancelOrder,
    orderHistory,
    products
}