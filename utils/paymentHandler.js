import config from "../config/config.js";
const calculateCaptainPayment = async (captainId) => {
    try {
        // 1. Count completed orders
        const completedOrders = await db.Order.find({ captainId: captainId, orderStatus: config.ORDER_STATUS.DELIVERED }).countDocuments();

        // 2. Assume 100 units per order
        const orderIncome = completedOrders * 100;

        // 3. Assume 50 units/hour online (mock logic)
        const onlineHours = 8; // Use timestamps in real scenario
        const timeIncome = onlineHours * 50;

        // 4. Distance from route steps (mock logic)
        const driverRoutes = await db.Route.find({ captainId });
        let totalSteps = 0;
        driverRoutes.forEach(route => totalSteps += route.steps.length);
        const distanceIncome = totalSteps * 10; // 10 units per step

        const total = orderIncome + timeIncome + distanceIncome;

        return {
            completedOrders,
            orderIncome,
            timeIncome,
            distanceIncome,
            total
        };
    } catch (error) {
        console.error(error);
    }
};

export default calculateCaptainPayment;