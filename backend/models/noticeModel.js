import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  postedBy: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL of the image associated with the notice
    required: false,
  },
  postedAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time when the notice is created
  },
  validUntil: {
    type: Date, // The expiry date for the notice (optional)
    required: false,
  },
  department: {
    type: String, // Department related to the notice (e.g., "IT", "HR", etc.)
    required: false,
  },
});

// Create and export the model
const noticeModel =
  mongoose.models.notice || mongoose.model("notice", noticeSchema);
export default noticeModel;
