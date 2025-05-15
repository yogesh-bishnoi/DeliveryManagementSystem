import mongoose from 'mongoose';
import config from '../config/config.js';

const OrderSchema = new mongoose.Schema({
    // Define the order schema
    orderId: {
        type: String,
        unique: true,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    deliveryManId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: [config.ORDER_STATUS.PENDING, config.ORDER_STATUS.DISPATCHED, config.ORDER_STATUS.DELIVERED, config.ORDER_STATUS.CANCELED],
        default: config.ORDER_STATUS.PENDING
    },
    totalAmount: {
        type: Number
    }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

export default Order;