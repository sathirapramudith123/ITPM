import express from "express";
import { authenticateUser, authenticateAdmin } from "../middleware/authMiddleware.js";
import {
  submitFeedback,
  getAllFeedback,
  updateFeedbackStatus,
  analyzeFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controller/feedbackController.js";

const router = express.Router();

router.post("/submit", authenticateUser, submitFeedback);
router.put("/update/:feedbackId", authenticateUser, updateFeedback);
router.delete("/delete/:feedbackId", authenticateUser, deleteFeedback);

router.get("/all", authenticateAdmin, getAllFeedback);
router.put("/status/:feedbackId", authenticateAdmin, updateFeedbackStatus);
router.get("/analyze", authenticateAdmin, analyzeFeedback);

export default router;