import express from "express";
// import multer from "multer";
import { addStudent } from "../controller/studentController.js";
const studentRouter = express.Router();

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

studentRouter.post("/add-student", addStudent);

export default studentRouter;
