import express from "express";

import {
    createJob,
    
} from "../controller/jobController.js";
import { getAllJobs } from "../controller/jobController.js";

const jobRouter = express.Router();

jobRouter.post("/job-post", createJob);
jobRouter.get("/job-get", getAllJobs);

export default jobRouter;
