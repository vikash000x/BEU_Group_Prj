import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String },
  collegeCode: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  extraInfo: {
    type: String,
    default: "",
  },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "gallery" }],
  headImage: [{ type: mongoose.Schema.Types.ObjectId, ref: "gallery" }],
  crouselImage: [{ type: String }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }], // Array of student IDs
  faculties: [{ type: mongoose.Schema.Types.ObjectId, ref: "faculty" }], // Array of faculty IDs
  departments: [{ type: String }],
  logo: { type: String, default: "" },
  city: { type: String, default: "" },
  phone: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
});

const collegeModel =
  mongoose.models.college || mongoose.model("college", collegeSchema);
export default collegeModel;
