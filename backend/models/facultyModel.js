import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  designation: { type: String, required: true },
  experience: { type: Number, required: true },
  qualification: { type: String },
  rating: { type: Number, default: 0.0 },
  profileImage: {
    type: String,
    default:
      "https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180", // Replace with a valid default image URL
  },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  courses: [{ type: String }],
});
const facultyModel =
  mongoose.models.faculty || mongoose.model("faculty", facultySchema);

export default facultyModel;
