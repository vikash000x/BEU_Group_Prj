import mongoose from "mongoose";

const startupSchema = new mongoose.Schema({
  startupName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
  },
  createdJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
  websiteLink: {
    type: String,
  },
});

const startupModel =
  mongoose.models.startup || mongoose.model("startup", startupSchema);
export default startupModel;
