import studentModel from "../models/studentModel.js";
import collegeModel from "../models/collegeModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import studentProfileModel from "../models/studentProfileModel.js";
import mailSender from "../config/mailSender.js";
import { studentRegistrationEmail } from "../mail/templates/studentRegistrationEmail.js";



// Fetch applied and saved jobs for a student
   export const applysave =  async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find the student by studentId
    const student = await studentModel.findById(studentId)
      .populate('appliedJobs') // Assuming appliedJobs is a reference to the Job model
      .populate('savedJobs'); // Assuming savedJobs is a reference to the Job model

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch applied and saved jobs
    const appliedJobs = student.appliedJobs;
    const savedJobs = student.savedJobs;

    // Return the jobs in the response
    return res.status(200).json({
      appliedJobs,
      savedJobs,
    });
  } catch (error) {
    console.error('Error fetching student jobs:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const addStudent = async (req, res) => {
  const {
    name,
    branch,
    year,
    cgpa,
    regNo,
    gender,
    collegeId,
    password,
    semester,
    rollNo,
    dob,
    email,
  } = req.body;

  if (
    (!name,
    !branch,
    !year,
    !cgpa,
    !regNo,
    !gender,
    !collegeId,
    !password,
    !semester)
  ) {
    return res(500).json({ message: "Please provide all fields" });
  }
  try {
    const college = await collegeModel.findOne({ _id: collegeId });
    if (!college) {
      return res.status(404).json({ message: "You are not registered by BEU" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sameRegNoStudent = await studentModel.findOne({ regNo });
    if (sameRegNoStudent) {
      return res.status(500).json({
        message: "A student is already registeres with same Registration No.",
      });
    }

    const newStudent = await studentModel.create({
      name,
      branch,
      year,
      cgpa,
      regNo,
      gender,
      password: hashedPassword,
      collegeId,
      semester,
      rollNo,
      dob,
      // profileImage: image_filename,
    });
    college.students.push(newStudent._id);
    await college.save();

    const newStudentProfile = await studentProfileModel.create({ email });
    newStudent.studentProfileId = newStudentProfile._id;
    await newStudent.save();

    //sending mail to registered student
    await mailSender(
      email,
      `You are registered Successfully`,
      studentRegistrationEmail(`${name}`)
    );

    res.status(200).json({ message: "Student added", college });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// this controller for college admin
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, branch, year, grade, cgpa } = req.body;
  try {
    // Update the student by ID
    const updatedStudent = await studentModel.findByIdAndUpdate(
      id,
      { name, branch, year, grade, cgpa },
      { new: true }
    );

    // If student not found
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleCollegeStudentData = async (req, res) => {
  const { collegeCode } = req.params;
  try {
    const college = await collegeModel
      .findOne({ collegeCode })
      .populate("students");
    if (!college) {
      return res.json({
        message: "college is not found",
      });
    }
    const studentData = college.students;
    if (!studentData) {
      return res.json({
        message: "student data is not availble",
      });
    }

    res.json({
      success: true,
      studentData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error while getting faculty data",
    });
  }
};

// this controller for student to update profile
export const updateStudentProfile = async (req, res) => {
  console.log("Request parameters:", req.params);
  const { profileId } = req.params; // Profile ID from the route
  const { profile_image, skills, resume, about } = req.body; // Data from the frontend

  try {
    const updateFields = {};
    if (profile_image) updateFields.profile_image = profile_image;
    if (skills) {
      // Split the string by commas, trim whitespace, and filter out empty strings
      updateFields.skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);
    }
    if (resume) updateFields.resume = resume;
    if (about) updateFields.about = about;

    // Update the profile with only the specified fields
    const updatedProfile = await studentProfileModel.findByIdAndUpdate(
      profileId,
      { $set: updateFields }, // Use $set to update specific fields only
      { new: true } // Return the updated document
    );

    // If no profile is found, return a 404 error
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to delete a student , a college will delete the student
export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  const { collegeId } = req.body;

  try {
    // Find the student by ID
    const student = await studentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the associated college

    const college = await collegeModel.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "Associated college not found" });
    }

    // Remove the student from the college's student list
    college.students = college.students.filter(
      (id) => id.toString() !== studentId
    );
    await college.save();

    // Delete the student
    await studentModel.findByIdAndDelete(studentId);

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginStudent = async (req, res) => {
  const { regNo, password } = req.body;

  if (!regNo || !password) {
    return res.status(400).json({
      message: "Please provide both Registration Number and Password",
    });
  }

  try {
    const student = await studentModel
      .findOne({ regNo })
      .populate("studentProfileId");
    if (!student) {
      return res.status(404).json({
        message: "Student not found. Please check your Registration Number.",
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { studentId: student._id, regNo: student.regNo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    student.password = "";

    res.status(200).json({
      message: "Login successful",
      token,
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateExternalLinks = async (req, res) => {
  try {
    const { studentId } = req.params; // Extracting studentId from request parameters
    const { thumbnail, title, description, link } = req.body; // Extracting new link data from the request body
    //console.log(studentId)
    // Validate required fields
    if (!thumbnail || !title || !description || !link) {
      return res
        .status(400)
        .json({ message: "Name, URL, and Thumbnail are required" });
    }

    // Find the student profile by ID
    const student = await studentProfileModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Push the new external link into the externalLinks array
    student.externalLinks.push({ thumbnail, title, description, link });

    // Save the updated student profile
    await student.save();

    return res.status(200).json({
      message: "External link added successfully",
      externalLinks: student.externalLinks,
    });
  } catch (error) {
    console.error("Error updating external links:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteExternalLink = async (req, res) => {
  try {
    const { studentId, linkId } = req.params; // Extracting studentId and linkId from request parameters

    // Find the student profile by ID
    const student = await studentProfileModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Filter out the link with the given linkId
    const linkIndex = student.externalLinks.findIndex(
      (link) => link._id.toString() === linkId
    );

    if (linkIndex === -1) {
      return res.status(404).json({ message: "Link not found" });
    }

    // Remove the link from the externalLinks array
    student.externalLinks.splice(linkIndex, 1);

    // Save the updated student profile
    await student.save();

    return res.status(200).json({
      message: "External link deleted successfully",
      externalLinks: student.externalLinks,
    });
  } catch (error) {
    console.error("Error deleting external link:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

<<<<<<< HEAD


=======
// export const updateProfile = async (req, res) => {
>>>>>>> 2a2aa945fff89d8f931efda7a928624c3d25a60a
//     try {
//         const updatedProfile = await studentModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!updatedProfile) {
//             return res.status(404).json({
//                 message: "Job not found",
//             });
//         }
//         res.status(200).json({
//             message: "Job updated successfully",
//             data: updatedJob,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to update job",
//             error: error.message,
//         });
//     }
// };

// export const updateProfle = async (req, res) => {
//   try {
//     const { studentId } = req.params; // Extracting studentId from request parameters
//     const {profilepic, skills, resume, about } = req.body; // Extracting new link data from the request body
//   //console.log(studentId)
//     // Validate required fields

//     // Find the student profile by ID
//     const student = await studentProfileModel.findById(studentId);

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     // Push the new external link into the externalLinks array
//     student.push({ profilepic, skills, resume, about  });

//     // Save the updated student profile
//     await student.save();

//     return res.status(200).json({ message: "External link added successfully", externalLinks: student.externalLinks });
//   } catch (error) {
//     console.error("Error updating external links:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
