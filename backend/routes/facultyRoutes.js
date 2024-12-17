import express from "express";

import {
  addFaculty,
  deleteFaculty,
  getSingleCollegeFacultyData,
  updateFaculty,
} from "../controller/facultyController.js";
import authMiddleware from "../middleware/auth.js";
const facultyRouter = express.Router();

facultyRouter.post("/add-faculty", authMiddleware, addFaculty);
facultyRouter.put("/update-faculty/:facultyId", updateFaculty);
facultyRouter.delete("/delete-faculty/:facultyId", deleteFaculty);
facultyRouter.get(
  "/get-faculty-data/:collegeCode",
  getSingleCollegeFacultyData
);

export default facultyRouter;
