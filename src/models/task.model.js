import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["done", "pending", "in progress", "completed"],
      default: "done",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
