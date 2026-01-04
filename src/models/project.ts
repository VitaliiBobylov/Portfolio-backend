import { Schema, model } from "mongoose";

export interface IProject {
  title: string;
  image: string;
  description: string;
  link: string;
  createdAt?: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", projectSchema);
