// backend/features/company/company.routes.js
import express from "express";
import multer from "multer";
import auth from "../../middleware/auth.js";
import { createWorkspace, getCompanyProfile } from "./company.controller.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/workspace", 
  auth(), 
  upload.single("logo"),
  (req, _res, next) => {
    console.log("📦 After multer - req.body:", req.body);
    console.log("📦 After multer - req.file:", req.file?.originalname);
    next();
  },
  createWorkspace
);
router.get("/me", auth(), getCompanyProfile);

export default router;
