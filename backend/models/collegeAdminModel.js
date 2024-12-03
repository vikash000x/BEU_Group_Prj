import mongoose from "mongoose";

const collegeAdminSchema = new mongoose.Schema({
  collegename: {
    type: String,
    required: true,
  },
  collegecode: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collegeAdminModel =
  mongoose.models.collegeAdmin ||
  mongoose.model("collegeAdmin", collegeAdminSchema);
export default collegeAdminModel;
