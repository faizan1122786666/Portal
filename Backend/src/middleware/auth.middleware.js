/**
 * File: auth.middleware.js
 * Description: JWT verification middleware for protecting routes and enforcing role-based access control.
 * Why: To centralize authentication and authorization logic, ensuring only valid sessions can reach protected endpoints.
 */

const jwt = require('jsonwebtoken');

/**
 * Function: verifyToken
 * Description: Verifies the JWT cookie on any request and attaches the decoded user payload to req.user.
 * Why: To protect routes that require a logged-in user (any role) without repeating verification logic in each controller.
 */
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

/**
 * Function: verifyAdmin
 * Description: Verifies the JWT cookie AND confirms the user has the 'admin' role.
 * Why: To restrict admin-only routes, ensuring employees cannot access management endpoints.
 */
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