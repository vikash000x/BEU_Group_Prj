import mongoose from "mongoose";

const BEUAdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collegeCode: {
      type: String,
      required: true,
    },
    phone: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    notifications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "notification" },
    ],
    notices: [{ type: mongoose.Schema.Types.ObjectId, ref: "notice" }],
  },
  { timestamps: true }
);

const BEUAdminModel =
  mongoose.models.BEUAdmin || mongoose.model("BEUAdmin", BEUAdminSchema);
export default BEUAdminModel;
