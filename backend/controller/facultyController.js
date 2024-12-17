import collegeModel from "../models/collegeModel.js";
import facultyModel from "../models/facultyModel.js";
import { uploadImageToCloudinary } from "../config/cloudinary.js";
export const addFaculty = async (req, res) => {
  const {
    name,
    gender,
    department,
    designation,
    experience,
    email,
    phone,
    courses,
    collegeId,
    qualification,
  } = JSON.parse(req.body.facultyData);

  try {
    const { image } = req.files;
    const college = await collegeModel.findOne({ _id: collegeId });
    if (!college) {
      return res.status(404).json({ message: "College Code incorrect" });
    }
    const thumbnailImage = await uploadImageToCloudinary(image, "beu");
    const imagePaths = thumbnailImage.secure_url;
    const newFaculty = await facultyModel.create({
      name,
      gender,
      department,
      designation,
      experience,
      profileImage: imagePaths,
      email,
      phone,
      courses,
      collegeId,
      qualification,
    });
    college.faculties.push(newFaculty._id);
    await college.save();
    res.status(200).json({ message: "Faculty added", college });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// this controller for college admin
export const updateFaculty = async (req, res) => {
  const { facultyId } = req.params; // Extract studentId from route parameters
  const {
    name,
    department,
    designation,
    experience,
    rating,
    email,
    phone,
    office,
    specialization,
    courses,
  } = req.body; // Extract updated fields from request body

  try {
    // Update the student by ID
    const updatedFaculty = await facultyModel.findByIdAndUpdate(
      facultyId,
      {
        name,
        department,
        designation,
        experience,
        rating,
        email,
        phone,
        office,
        specialization,
        courses,
      }, // Fields to update
      { new: true } // Options: Return the updated document and validate the data
    );

    // If student not found
    if (!updatedFaculty) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Faculty updated successfully", updatedFaculty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to delete a student , a college will delete the student
export const deleteFaculty = async (req, res) => {
  const { facultyId } = req.params;

  try {
    // Find the student by ID
    const faculty = await facultyModel.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Find the associated college
    const college = await collegeModel.findOne({ faculties: facultyId });
    if (!college) {
      return res.status(404).json({ message: "Associated college not found" });
    }

    // Remove the student from the college's student list
    college.faculties = college.faculties.filter(
      (id) => id.toString() !== facultyId
    );
    await college.save();

    // Delete the student
    await facultyModel.findByIdAndDelete(facultyId);

    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleCollegeFacultyData = async (req, res) => {
  const { collegeCode } = req.params;
  try {
    const college = await collegeModel
      .findOne({ collegeCode })
      .populate("faculties");
    if (!college) {
      return res.json({
        message: "college is not found",
      });
    }
    console.log(college);
    const facultyData = college.faculties;
    console.log(facultyData);
    if (!facultyData) {
      return res.json({
        message: "faculty data is not availble",
      });
    }

    res.json({
      success: true,
      facultyData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error while getting faculty data",
    });
  }
};
