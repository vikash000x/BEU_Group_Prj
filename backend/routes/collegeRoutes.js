import express from "express";
import {
  addCollegeDetails,
  deleteCarouselImage,
  deleteGalleryImage,
  deleteHeadImage,
  getAllCollege,
  getGalleryImage,
  getSingleCollege,
  uplaoadGalleryImage,
  uploadCarousel,
  uploadHeadImage,
} from "../controller/collegeController.js";
import { uploadImage } from "../config/uploadImage.js";
import authMiddleware from "../middleware/auth.js";
import {
  createStudyMaterial,
  deleteStudyMaterial,
  getAllStudyMaterial,
  getStudyMaterialById,
  updateStudyMaterial,
} from "../controller/studyMaterialController.js";

const collegeRouter = express.Router();

collegeRouter.put("/add-details/:collegeCode", addCollegeDetails);
collegeRouter.get("/get-single-college/:collegecode", getSingleCollege);
collegeRouter.get("/get-all-college", getAllCollege);
collegeRouter.post("/upload-image", uploadImage);
collegeRouter.post("/upload-crousel", authMiddleware, uploadCarousel);
collegeRouter.post("/upload-gallery", uplaoadGalleryImage);
collegeRouter.post("/upload-head-image", authMiddleware, uploadHeadImage);
collegeRouter.delete("/delete-crousel", authMiddleware, deleteCarouselImage);
collegeRouter.delete("/delete-head-image", authMiddleware, deleteHeadImage);
collegeRouter.delete(
  "/delete-gallery-image",
  authMiddleware,
  deleteGalleryImage
);
collegeRouter.get("/get-gallery-image/:collegeCode", getGalleryImage);
collegeRouter.post("/create-study-material", createStudyMaterial);
collegeRouter.get("/all-study-material", getAllStudyMaterial);
collegeRouter.get("/study-material/:id", getStudyMaterialById);
collegeRouter.put("/update-study-material/:id", updateStudyMaterial);
collegeRouter.delete("/delete-study-material/:id", deleteStudyMaterial);

export default collegeRouter;
