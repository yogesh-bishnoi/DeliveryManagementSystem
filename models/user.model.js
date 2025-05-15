import mongoose from 'mongoose';
import config from '../config/config.js';

const UserSchema = new mongoose.Schema({
    // Define the user schema
    userId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    vehicleType: {
        type: String,
        enum: config.VEHICLES
    },
    status: {
        type: String,
        enum: [config.CAPTAIN_STATUS.ACTIVE, config.CAPTAIN_STATUS.INACTIVE]
    },
    otp: {
        type: Number
    },
    role: {
        type: String,
        enum: [config.ROLE.ADMIN, config.ROLE.CAPTAIN, config.ROLE.USER],
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;