import express from "express";
import {
  getAllRegisteredCollege,
  loginCollege,
  registerCollege,
  removeCollege,
} from "../controller/collegeAdminController.js";
const collegeAdminRouter = express.Router();
collegeAdminRouter.post("/register-college", registerCollege);
collegeAdminRouter.delete("/remove-college/:id", removeCollege);
collegeAdminRouter.post("/login-college", loginCollege);
collegeAdminRouter.get("/all-registered-college", getAllRegisteredCollege);


export default collegeAdminRouter;
