import { Job } from "../models/jobModel.js"; // Adjust the path based on your file structure

// Controller to create a new job
export const createJob = async (req, res) => {
    try {
      
        const { title,  description, requirements, salary, location, jobType, experience, position } = req.body;
        
       if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position) {
        return res.status(400).json({
            message: "some fields have missing data",
            succecc : false
        })
       };

       const job = await Job.create({
        title,
        description,
        requirements,
        salary,
        location,
        jobType,
        experience,
        position
       
       });
       

        
     return    res.status(201).json({
            message: "Job created successfully",
            job,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create job",
            error: error.message,
        });
    }
};

// Controller to get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({
            message: "Jobs fetched successfully",
            data: jobs,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch jobs",
            error: error.message,
        });
    }
};

// Controller to get a single job by ID
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }
        res.status(200).json({
            message: "Job fetched successfully",
            data: job,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch job",
            error: error.message,
        });
    }
};

// Controller to update a job by ID
export const updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedJob) {
            return res.status(404).json({
                message: "Job not found",
            });
        }
        res.status(200).json({
            message: "Job updated successfully",
            data: updatedJob,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update job",
            error: error.message,
        });
    }
};

// Controller to delete a job by ID
export const deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({
                message: "Job not found",
            });
        }
        res.status(200).json({
            message: "Job deleted successfully",
            data: deletedJob,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete job",
            error: error.message,
        });
    }
};
