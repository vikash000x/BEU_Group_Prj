import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    salary: { type: Number, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    position: { type: Number, required: true },

    // New Field: Applicants who applied for this job
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],

  },
  { timestamps: true }
);

export const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
