// backend/features/company/company.routes.js
import express from "express";
import multer from "multer";
import auth from "../../middleware/auth.js";
import { createWorkspace, getCompanyProfile } from "./company.controller.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/workspace", auth(), upload.single("logo"), createWorkspace);
router.get("/me", auth(), getCompanyProfile);

export default router;
