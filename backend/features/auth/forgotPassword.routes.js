//backend/features/auth/forgotPassword.routes.js
import express from "express";
import { forgotPassword, resetPassword } from "./forgotPassword.controller.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
