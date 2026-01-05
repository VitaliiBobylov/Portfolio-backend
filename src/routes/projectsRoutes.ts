import { Router } from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectsController";
import { auth } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getProjects);
router.post("/", auth, createProject);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

export default router;
