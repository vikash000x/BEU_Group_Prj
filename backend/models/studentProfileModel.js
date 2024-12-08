const mongoose = require("mongoose");

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
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        thumbnail: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

module.exports = StudentProfile;
