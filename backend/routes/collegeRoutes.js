import express from "express";
import {
  addCollegeDetails
} from "../controller/collegeController.js";
import { uploadImage } from "../config/uploadImage.js";

const collegeRouter = express.Router();

collegeRouter.post("/add-details", addCollegeDetails);
collegeRouter.post("/upload-image", uploadImage);

export default collegeRouter;
