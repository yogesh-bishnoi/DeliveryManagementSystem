import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    // Define the product schema
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

export default Product;