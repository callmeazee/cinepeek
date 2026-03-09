const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // ⭐ IMPORTANT FIX
    req.user = user;

    next();
  } catch (error) {
       console.error(error)
 res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = protect;
