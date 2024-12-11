import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  collegeCode: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
});

const galleryModel =
  mongoose.models.gallery || mongoose.model("gallery", gallerySchema);
export default galleryModel;
