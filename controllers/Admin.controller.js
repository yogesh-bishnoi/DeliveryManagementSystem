import { asyncHandler } from "../utils/asyncHandler.js";
import calculateCaptainPayment from "../utils/paymentHandler.js";


// Product add
const addProduct = asyncHandler(async (req, res) => {
    const { productName, description, price } = req.body;
    await db.Product.create({ productName, description, price });
    return res.status(201).json({ success: true, message: "Product added successfully!" })
});

// Calculate payment 
const captainPayment = asyncHandler(async (req, res) => {
    const { captainId } = req.body;
    const totalIncome = await calculateCaptainPayment(captainId);
    return res.status(200).json({ success: true, message: "Payment history found successfully!", data: totalIncome });
})

export {
    addProduct,
    captainPayment
}


//////