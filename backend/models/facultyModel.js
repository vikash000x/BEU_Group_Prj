import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  experience: { type: Number, required: true },
  rating: { type: Number, required: true },
  profileImage: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  office: { type: String, required: true },
  specialization: { type: String, required: true },
  courses: [{ type: String }],
});
const facultyModel =
  mongoose.models.faculty || mongoose.model("faculty", facultySchema);

export default facultyModel;
