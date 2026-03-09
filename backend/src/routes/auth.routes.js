const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.Controller");
const protect = require("../middleware/auth.middleware");

/* POST: /api/auth/signup */
authRouter.post("/register", authController.registerController);

/* POST: /api/auth/login */
authRouter.post("/login", authController.loginController);

authRouter.post("/logout", authController.logoutController);

authRouter.get("/me", protect, authController.getCurrentUser);

module.exports = authRouter;
