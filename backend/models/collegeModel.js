import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  collegeCode: { type: String, required: true, unique: true },
  description: { type: String },
  images: [{ type: String }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Array of student IDs
  faculties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }], // Array of faculty IDs
});

const collegeModel =
  mongoose.models.college || mongoose.model("college", collegeSchema);
export default collegeModel;
