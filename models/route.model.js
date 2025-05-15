import mongoose from 'mongoose';
import config from '../config/config.js';

const stepSchema = new mongoose.Schema({
    location: String, // or { lat: Number, lng: Number }
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const RouteSchema = new mongoose.Schema({
    // Define the route schema
    routeId: {
        type: String,
        unique: true,
        required: true
    },
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    steps: [stepSchema],
    status: {
        type: String,
        enum: [config.ROUTE_STATUS.PENDING, config.ROUTE_STATUS.IN_PROGRESS, config.ROUTE_STATUS.COMPLETED],
        default: config.ROUTE_STATUS.PENDING
    }
}, { timestamps: true });

const Route = mongoose.model('Route', RouteSchema);

export default Route;