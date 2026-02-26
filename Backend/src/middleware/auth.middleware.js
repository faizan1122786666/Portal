const jwt = require('jsonwebtoken');

// ── Verify any logged-in user ─────────────────────────────────────────────────
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // { id, role } now available in every route
        next();             // move to the next function (controller)

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

// ── Verify admin only ─────────────────────────────────────────────────────────
const verifyAdmin = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden - Admin access only' });
        }

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

module.exports = { verifyToken, verifyAdmin };