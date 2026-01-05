import { Request, Response } from "express";
import { Project } from "../models/project";
import { AuthRequest } from "../middleware/authMiddleware";

export const getProjects = async (_req: AuthRequest, res: Response) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

export const createProject = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  const project = await Project.create({ ...req.body, userId: user.id });
  res.status(201).json(project);
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  if (project.userId?.toString() !== user.id) return res.status(403).json({ message: "Forbidden" });

  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  if (project.userId?.toString() !== user.id) return res.status(403).json({ message: "Forbidden" });

  await Project.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
