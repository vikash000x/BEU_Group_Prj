import express from "express";
import {
  addCollegeDetails,
  deleteCarouselImage,
  deleteGalleryImage,
  deleteHeadImage,
  getAllCollege,
  getSingleCollege,
  uplaoadGalleryImage,
  uploadCarousel,
  uploadHeadImage,
} from "../controller/collegeController.js";
import { uploadImage } from "../config/uploadImage.js";

const collegeRouter = express.Router();

collegeRouter.put("/add-details/:collegeCode", addCollegeDetails);
collegeRouter.get("/get-single-college", getSingleCollege);
collegeRouter.get("/get-all-college", getAllCollege);
collegeRouter.post("/upload-image", uploadImage);
collegeRouter.post("/upload-crousel", uploadCarousel);
collegeRouter.post("/upload-gallery", uplaoadGalleryImage);
collegeRouter.post("/upload-head-image", uploadHeadImage);
collegeRouter.delete("/delete-crousel", deleteCarouselImage);
collegeRouter.delete("/delete-head-image", deleteHeadImage);
collegeRouter.delete("/delete-gallery-image", deleteGalleryImage);

export default collegeRouter;
