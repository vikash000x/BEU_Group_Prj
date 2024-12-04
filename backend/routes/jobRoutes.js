import express from "express";

import {
    postJob,
    getAllJobs,
} from "../controller/jobController.js";

const jobRouter = express.Router();

jobRouter.post("/job-post", postJob);
jobRouter.post("/getjob", getAllJobs);

export default jobRouter;
