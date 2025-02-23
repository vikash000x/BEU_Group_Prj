import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    profile_image: {
      type: String, // URL or file path to the profile image
    },
    skills: {
      type: [String], // Array of strings to store skills
    },
    resume: {
      type: String, // URL or file path to the resume
    },
    about: {
      type: String, // Short description or bio
      maxlength: 500, // Limit the length of the about field
    },
    externalLinks: [
      {
        thumbnail: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
         description: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        }
      },
    ],
    email: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const studentProfileModel = mongoose.models.StudentProfile || mongoose.model("StudentProfile", studentProfileSchema);

export default studentProfileModel;