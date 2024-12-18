import express from "express";

import {
  createJob,
  getJobById,
  updateJob,
} from "../controller/jobController.js";
import { getAllJobs } from "../controller/jobController.js";
import startupAuthMiddleware from "../middleware/startupAuth.js";

const jobRouter = express.Router();

jobRouter.post("/job-post", startupAuthMiddleware, createJob);
jobRouter.get("/job-get", getAllJobs);
jobRouter.get("/job-get/:id", getJobById);
jobRouter.put("/job-update/:id", updateJob);

export default jobRouter;
