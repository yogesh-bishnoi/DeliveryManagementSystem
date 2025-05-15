import { asyncHandler } from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken";
import { GenerateUserId, hashpassword, comparePassword } from "../utils/authHandler.js";
import dotenv from "dotenv";
// Configure dotenv
dotenv.config({
    path: './.env'
})


// SignUp
const signUp = asyncHandler(async (req, res) => {
    const { name, email, phone, role, password } = req.body;
    // Check is user already exist
    const isExist = await db.User.findOne({ email: email, phone: phone });
    if (isExist) {
        return res.status(400).json({ success: false, message: 'An account with these details already exists!' });
    }
    // Hash password
    const hashedPassword = await hashpassword(password);
    // Generate userId
    const userId = await GenerateUserId();
    // Create user
    const user = await db.User.create({
        userId: userId,
        name: name,
        email: email,
        phone: phone,
        role: role,
        password: hashedPassword
    });
    // jwt
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // Response
    return res.status(201).json({ success: true, message: 'You have signed up successfully!', token: token });
});


// SignIn
const signIn = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    // Find user by email and phone
    const user = await db.User.findOne({ email: email, role: role });
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials or account does not exist!' });
    }

    // Compare password
    const isMatch = await comparePassword(user.password, password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid password!' });
    }

    // Generate JWT token
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Respond with success
    return res.status(200).json({
        success: true,
        message: 'Login successful!',
        token: token
    });
});

export {
    signUp,
    signIn
}
