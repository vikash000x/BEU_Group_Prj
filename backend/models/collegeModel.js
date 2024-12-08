import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  collegeCode: { type: String, required: true, unique: true },
  description: { type: String },
  extraInfo: {
    type: String,
  },
  images: [
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      info: {
        type: String,
      },
    },
  ],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }], // Array of student IDs
  faculties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }], // Array of faculty IDs
  departments: [{ type: String }],
  logo: { type: String },
  city: { type: String },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
});

const collegeModel =
  mongoose.models.college || mongoose.model("college", collegeSchema);
export default collegeModel;
