import jwt from "jsonwebtoken";

// Base token verification function
const verifyToken = (token, secret) => {
  if (!token) {
    throw new Error("No token, authorization denied");
  }
  const decoded = jwt.verify(token, secret);
  if (!decoded.id) {
    throw new Error("Invalid token payload: missing user ID");
  }
  return decoded;
};

// General user authentication
export const authenticateUser = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = verifyToken(token, process.env.JWT_SECRET);

    req.user = {
      _id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    console.error("Token error:", error.message);
    res.status(401).json({ message: error.message });
  }
};

// Admin-only authentication
export const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = verifyToken(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.user = {
      _id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    console.error("Token error:", error.message);
    res.status(401).json({ message: error.message });
  }
};

// Employer or Admin authentication
export const authenticateEmployerOrAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = verifyToken(token, process.env.JWT_SECRET);

    if (!["employer", "admin"].includes(decoded.role)) {
      return res.status(403).json({ message: "Employer or Admin access required" });
    }

    req.user = {
      _id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    console.error("Token error:", error.message);
    res.status(401).json({ message: error.message });
  }
};