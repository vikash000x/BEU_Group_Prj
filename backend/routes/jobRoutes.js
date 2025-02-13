import express from "express";

import {
  createJob,
  getJobById,
  updateJob,
  saveJob, applyJob,
  stdlist
} from "../controller/jobController.js";
import { getAllJobs } from "../controller/jobController.js";
import startupAuthMiddleware from "../middleware/startupAuth.js";


const jobRouter = express.Router();

jobRouter.post("/job-post", startupAuthMiddleware, createJob);
jobRouter.get("/job-get", getAllJobs);
jobRouter.get("/job-applicants", stdlist);
jobRouter.get("/job-get/:id", getJobById);
jobRouter.put("/job-update/:id", updateJob);
jobRouter.post("/save", saveJob);   // Endpoint to save a job
jobRouter.post("/apply", applyJob); // Endpoint to apply for a job


export default jobRouter;
