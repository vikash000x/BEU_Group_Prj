import express from "express";
import multer from "multer";
import {
  addCollegeDetails,
  uploadImage,
} from "../controller/collegeController.js";

const collegeRouter = express.Router();
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
collegeRouter.post("/add-details", addCollegeDetails);
collegeRouter.post("/upload-image", upload.single("image"), uploadImage);

export default collegeRouter;
