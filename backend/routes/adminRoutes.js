import express from "express";
import {
  manageJobPostings,
  manageUserRoles,
  manageCategories,
  getAllJobs,
  getAllUsers,
  deleteUser,
} from "../controller/adminController.js";
import { authenticateUser, authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/jobs", authenticateUser, authenticateAdmin, manageJobPostings);
router.post("/users/roles", authenticateUser, authenticateAdmin, manageUserRoles);
router.post("/categories", authenticateUser, authenticateAdmin, manageCategories);
router.get("/jobs", authenticateUser, authenticateAdmin, getAllJobs); // New
router.get("/users", authenticateUser, authenticateAdmin, getAllUsers); // New
router.delete("/users/:userId", authenticateUser, authenticateAdmin, deleteUser); // New

export default router;