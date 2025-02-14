import express from "express";

import {
  addStudent,
  applysave,
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
<<<<<<< HEAD

studentRouter.get("/:studentId/apply-save", applysave)

studentRouter.post("/login-student", loginStudent)
=======
studentRouter.post("/login-student", loginStudent);
>>>>>>> 2a2aa945fff89d8f931efda7a928624c3d25a60a
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
