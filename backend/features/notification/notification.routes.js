import express from "express";
import auth from "../../middleware/auth.js";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "./notification.controller.js";

const router = express.Router();

router.get("/my", auth(), getMyNotifications);
router.patch("/:id/read", auth(), markNotificationAsRead);

export default router;
