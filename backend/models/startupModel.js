import mongoose from "mongoose";

const startupSchema = new mongoose.Schema({
  startupName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
});

const startupModel =
  mongoose.models.startup || mongoose.model("startup", startupSchema);
export default startupModel;
