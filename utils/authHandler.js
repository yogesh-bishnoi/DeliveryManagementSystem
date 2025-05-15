import bcrypt from "bcryptjs";

// sum data from given model field
const sum = async (model, field, query) => {
    const data = model.find(query).select(field);
    const sum = data.reduce((value, item) => value + item[field], 0);
    return sum;
}

// UserId for users
const GenerateUserId = async () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let userId = "";

    for (let i = 0; i < 5; i++) {
        userId += chars[Math.floor(Math.random() * chars.length)];
    }

    const exists = await db.User.findOne({ userId });
    if (exists) return GenerateUserId();

    return userId;
};

// Generate order id for orders
const GenerateOrderId = async () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderId = "";

    for (let i = 0; i < 5; i++) {
        orderId += chars[Math.floor(Math.random() * chars.length)];
    }

    const exists = await db.Order.findOne({ orderId });
    if (exists) return GenerateOrderId();

    return orderId;
};

// Generate order id for orders
const GenerateRouteId = async () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let routeId = "";

    for (let i = 0; i < 5; i++) {
        routeId += chars[Math.floor(Math.random() * chars.length)];
    }

    const exists = await db.Route.findOne({ routeId });
    if (exists) return GenerateRouteId();

    return routeId;
};

// HashPassword
const hashpassword = async (password) => {
    const saltround = 10
    const hashpassword = await bcrypt.hash(password, saltround);
    return hashpassword
}

// comparePassword
const comparePassword = async (userpass, password) => {
    return await bcrypt.compare(password, userpass)
}

export {
    sum,
    GenerateUserId,
    GenerateOrderId,
    GenerateRouteId,
    hashpassword,
    comparePassword
}