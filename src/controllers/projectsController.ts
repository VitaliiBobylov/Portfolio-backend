import { Request, Response } from "express";
import { Project } from "../models/project";

export const getProjects = async (_req: Request, res: Response) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

export const createProject = async (req: Request, res: Response) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
};

export const deleteProject = async (req: Request, res: Response) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
