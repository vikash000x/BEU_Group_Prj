import express from "express";

import {
  addStudent,
  deleteStudent,
  updateStudent,
} from "../controller/studentController.js";
const studentRouter = express.Router();

studentRouter.post("/add-student", addStudent);
studentRouter.put("/update-student/:id", updateStudent);
studentRouter.delete("/delete-student/:studentId", deleteStudent);

export default studentRouter;
