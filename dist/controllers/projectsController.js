"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.createProject = exports.getProjects = void 0;
const project_1 = require("../models/project");
const getProjects = async (_req, res) => {
    const projects = await project_1.Project.find().sort({ createdAt: -1 });
    res.json(projects);
};
exports.getProjects = getProjects;
const createProject = async (req, res) => {
    const project = await project_1.Project.create(req.body);
    res.status(201).json(project);
};
exports.createProject = createProject;
const deleteProject = async (req, res) => {
    await project_1.Project.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
exports.deleteProject = deleteProject;
