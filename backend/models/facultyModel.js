import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  // id: { type: Number, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  experience: { type: Number, required: true },
  rating: { type: Number, required: true },
  profileImage: {
    type: String,
    default:
      "https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180", // Replace with a valid default image URL
  },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  office: { type: String, required: true },
  specialization: { type: String, required: true },
  courses: [{ type: String }],
  collegeCode: { type: String, required: true },
});
const facultyModel =
  mongoose.models.faculty || mongoose.model("faculty", facultySchema);

export default facultyModel;
