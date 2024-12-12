import mongoose from "mongoose";

const startupRegistrationSchema = new mongoose.Schema({
  startupName: {
    type: String,
    required: true,
  },
  collegeCode: {
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

const startupRegistrationModel =
  mongoose.models.startupRegistration ||
  mongoose.model("startupRegistration", startupRegistrationSchema);
export default startupRegistrationModel;
