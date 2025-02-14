import express from "express";

import {
  addStudent,
  deleteExternalLink,
  deleteStudent,
  getSingleCollegeStudentData,
  loginStudent,
  updateExternalLinks,
  updateStudent,
  updateStudentProfile,
} from "../controller/studentController.js";
import authMiddleware from "../middleware/auth.js";
const studentRouter = express.Router();

studentRouter.post("/add-student", authMiddleware, addStudent);
studentRouter.put("/update-student/:id", updateStudent);
studentRouter.delete(
  "/delete-student/:studentId",
  authMiddleware,
  deleteStudent
);
studentRouter.post("/login-student", loginStudent);
studentRouter.put("/update-studentprofile/:profileId", updateStudentProfile);
studentRouter.post("/update-external-links/:studentId", updateExternalLinks);
studentRouter.delete(
  "/delete-external-links/:studentId/:linkId",
  deleteExternalLink
);

studentRouter.get(
  "/get-student-data/:collegeCode",
  getSingleCollegeStudentData
);

export default studentRouter;
