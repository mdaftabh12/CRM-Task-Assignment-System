import mongoose from "mongoose";
const objectId = mongoose.Types.ObjectId;

const taskSchema = new mongoose.Schema(
  {
    subject: String,
    priority: {
      type: String,
      enum: ["HIGH", "MEDIUM", "URGENT"],
      default: "MEDIUM",
    },
    projectId: {
      type: objectId,
      ref: "projectModel",
    },
    assignedTo: {
      type: objectId,
      ref: "userModel",
    },
    reminder: String,
    onTimeComplete: {
      type: String,
      enum: ["YES", "NO"],
    },
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["IN PROGRESS", "COMPLETE", "TESTING"],
      default: "IN PROGRESS",
    },
    discription: String,
    followers: [],
  },
  { timestamps: true }
);

export default mongoose.model("taskModel", taskSchema);
