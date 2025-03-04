import { Job } from "../models/jobModel.js"; // Adjust the path based on your file structure
import startupModel from "../models/startupModel.js";
import studentModel from "../models/studentModel.js";

// Controller to create a new job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      startupId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position
    ) {
      return res.status(400).json({
        message: "some fields have missing data",
        succecc: false,
      });
    }
    if (!startupId) {
      return res.json({
        success: false,
        message: "You are not authorized to create a job",
      });
    }
    const startup = await startupModel.findById({ _id: startupId });
    console.log(startup);
    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
    });

    startup.createdJobs.push(job._id);
    await startup.save();

    return res.status(201).json({
      message: "Job created successfully",
      job,
      success: true,
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const totalJobs = await Job.countDocuments();
    const totalPages = Math.ceil(totalJobs / limit);

    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalJobs,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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


export const saveJob = async (req, res) => {
  try {
    const { studentId, jobId } = req.body;

    const student = await studentModel.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.savedJobs.includes(jobId)) {
      return res.status(400).json({ message: "Job already saved" });
    }

    student.savedJobs.push(jobId);
    await student.save();

    res.status(200).json({ message: "Job saved successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const applyJob = async (req, res) => {
  try {
    const { studentId, jobId } = req.body;

    const student = await studentModel.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (student.appliedJobs.includes(jobId)) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    student.appliedJobs.push(jobId);
    job.applicants.push(studentId);

    await student.save();
    await job.save();

    res.status(200).json({ message: "Job application successful", student, job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};




export const appliedList = async(req, res) =>{
  try{
    const {id} = req.params;
    if (!id) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const job= await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const studentIds = job.applicants || [];
    const students = await studentModel.find({_id: {$in: studentIds}});
    res.status(200).json({message: "students fetched successfully", students});
  } catch(error){
    res.status(500).json({message: "applied student data is not fetched", error});
  }
}