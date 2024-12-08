import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  cgpa: { type: Number, required: true },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  semester: {
    type: String,
  },
});

const studentModel =
  mongoose.models.student || mongoose.model("student", studentSchema);

export default studentModel;
