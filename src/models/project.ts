import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  image: string;
  description: string;
  link: string;
  userId?: string;
  createdAt?: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", projectSchema);
