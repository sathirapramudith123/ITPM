import express from "express";
import { manageJobPostings, manageUserRoles, manageCategories, getAllJobs, getAllUsers, deleteUser } from "../controller/adminController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/jobs/manage", authenticateAdmin, manageJobPostings);
router.post("/users/roles", authenticateAdmin, manageUserRoles);
router.post("/categories", manageCategories);
router.get("/jobs", authenticateAdmin, getAllJobs);
router.get("/users", authenticateAdmin, getAllUsers);
router.delete("/users/:userId", authenticateAdmin, deleteUser);

export default router;