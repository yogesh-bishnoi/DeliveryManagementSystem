import JWT from 'jsonwebtoken';

// Auth token middleware
const authJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Token not provided!" });
    }

    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Unauthorized!" });
        }

        const user = await db.User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials or account does not exist!" });
        }

        req.userId = decoded.userId;
        req.userRole = user.role;
        next();
    });
};

const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.userRole)) {
            return res.status(403).json({ success: false, message: "Access denied. Insufficient role!" });
        }
        next();
    };
};

export {
    authJwt,
    authorizeRole
}