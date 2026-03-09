// backend/features/company/company.routes.js
import express from "express";
import auth from "../../middleware/auth.js";
import { createWorkspace, getCompanyProfile } from "./company.controller.js";

const router = express.Router();

router.post("/workspace", auth(), createWorkspace);
router.get("/me", auth(), getCompanyProfile);

export default router;
