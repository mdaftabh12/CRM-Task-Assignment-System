import mongoose from "mongoose";
const objectId = mongoose.Types.ObjectId;

const teamSchema = new mongoose.Schema(
  {
    title: String,
    member: [],
    adminId: {
      type: objectId,
      ref: "userModel",
    },
  },
  { timestamps: true }
);

export default mongoose.model("teamModel", teamSchema);
