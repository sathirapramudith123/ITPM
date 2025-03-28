import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token payload: missing user ID" });
    }

    req.user = {
      _id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    console.error("Token error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export const authenticateAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token payload: missing user ID" });
    }

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
    res.status(401).json({ message: "Token is not valid" });
  }
};

export const authenticateEmployerOrAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token payload: missing user ID" });
    }

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
    res.status(401).json({ message: "Token is not valid" });
  }
};