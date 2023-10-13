import mongoose from "mongoose";
const objectId = mongoose.Types.ObjectId;

const projectSchema = new mongoose.Schema(
  {
    title: String,
    task: [{ type: objectId, ref: "taskModel" }],
    teamId: {
      type: objectId,
      ref: "teamModel",
    },
  },
  { timestamps: true }
);

export default mongoose.model("projectModel", projectSchema);
