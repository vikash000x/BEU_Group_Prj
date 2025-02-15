import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true },
  rollNo: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: Number, required: true },
  cgpa: { type: Number, required: true },
  collegeId: { type: String },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  semester: { type: Number },
  dob: { type: Date },
  password: { type: String, required: true },
  studentProfileId: { type: mongoose.Schema.Types.ObjectId, ref: "StudentProfile" },
  
  // New Fields
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],  // Jobs student has saved
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // Jobs student has applied for

}, { timestamps: true });

const studentModel = mongoose.models.student || mongoose.model("student", studentSchema);

export default studentModel;
