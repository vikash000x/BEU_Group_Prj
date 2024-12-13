import express from "express";

import {
  addStudent,
  deleteStudent,
  updateStudent,
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

export default studentRouter;
