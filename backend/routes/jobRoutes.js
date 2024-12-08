import express from "express";

import {
    createJob,
    getJobById,
    updateJob,
    
} from "../controller/jobController.js";
import { getAllJobs } from "../controller/jobController.js";

const jobRouter = express.Router();

jobRouter.post("/job-post", createJob);
jobRouter.get("/job-get", getAllJobs);
jobRouter.get("/job-get/:id", getJobById);
jobRouter.put("/job-update/:id", updateJob);

export default jobRouter;
