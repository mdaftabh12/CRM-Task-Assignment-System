import mongoose from "mongoose";
const objectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    image: String,
    email: String,
    phoneNumber: Number,
    password: String,
    teamId: [
      {
        type: objectId,
        ref: "teamModel",
      },
    ],
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("userModel", userSchema);
