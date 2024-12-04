import express from "express";
import {
  addCollegeDetails,
  uploadImage,
} from "../controller/collegeController.js";

const collegeRouter = express.Router();

collegeRouter.post("/add-details", addCollegeDetails);
collegeRouter.post("/upload-image/:id", uploadImage);

export default collegeRouter;
