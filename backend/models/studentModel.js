import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileImage: { type: String },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  grade: { type: String, required: true },
  cgpa: { type: Number, required: true },
});

const studentModel =
  mongoose.models.student || mongoose.model("student", studentSchema);

export default studentModel;
