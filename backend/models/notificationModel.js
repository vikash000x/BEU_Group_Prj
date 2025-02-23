import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  receiver: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attachment: {
    type:String,
  }
});

const notificationModel =
  mongoose.models.notification ||
  mongoose.model("notification", notificationSchema);

export default notificationModel;
