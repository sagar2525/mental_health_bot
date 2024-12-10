const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Replace with a secure secret key

/**
 * Middleware to verify the JWT token in the request header.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized access: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // Attach the userId to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };
