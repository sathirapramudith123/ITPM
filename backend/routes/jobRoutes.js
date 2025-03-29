import express from "express";
import { createJob, getJobs, getJobById, updateJob, deleteJob, getEmployerJobs, applyForJob, 
    //getCategories
     } from "../controller/jobController.js";
import { authenticateUser, authenticateEmployerOrAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);
//router.get("/categories", getCategories);
router.post("/jobs", authenticateUser, createJob); 
router.put("/jobs/:id", authenticateEmployerOrAdmin, updateJob);
router.delete("/jobs/:id", authenticateEmployerOrAdmin, deleteJob);
router.get("/employer/jobs",authenticateUser, getEmployerJobs);
router.post("/jobs/:id/apply", authenticateUser, applyForJob);

export default router;