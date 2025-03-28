import express from "express";
import { check } from "express-validator";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getEmployerJobs,
  applyForJob,
} from "../controller/jobController.js";
import { authenticateUser, authenticateEmployerOrAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("salary", "Salary must be a number").isNumeric(),
    check("location", "Location is required").not().isEmpty(),
    check("category", "Category is required").isMongoId(),
    check("jobType", "Job type must be full-time, part-time, or remote").isIn([
      "full-time",
      "part-time",
      "remote",
    ]),
    check("requirements", "Requirements must be an array").isArray(),
    check("deadline", "Deadline must be a valid date").isISO8601(),
  ],
  authenticateUser,
  authenticateEmployerOrAdmin,
  createJob
);

router.get("/", getJobs);
router.get("/:id", getJobById);
router.put("/:id", authenticateUser, authenticateEmployerOrAdmin, updateJob);
router.delete("/:id", authenticateUser, authenticateEmployerOrAdmin, deleteJob);
router.get("/employer/jobs", authenticateUser, authenticateEmployerOrAdmin, getEmployerJobs);
router.post("/:id/apply", authenticateUser, applyForJob);

export default router;