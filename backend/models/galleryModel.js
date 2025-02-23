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
  date: {
    type: String,
  },
  location: {
    type: String,
  },
});

const galleryModel =
  mongoose.models.gallery || mongoose.model("gallery", gallerySchema);
export default galleryModel;
// image:
// "https://tse3.mm.bing.net/th?id=OIP.AaHHFWTFaQyn_yXbrPsPCQHaDt&pid=Api&P=0&h=",
// eventName: "Robotics Workshop",
// description: "Hands-on learning and innovation in robotics technology.",
// date: "15-17 August 2024",
// location: "Computer Science Lab",
