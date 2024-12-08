import studentModel from "../models/studentModel.js";
import collegeModel from "../models/collegeModel.js";
import facultyModel from "../models/facultyModel.js";

export const addFaculty = async (req, res) => {
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
    collegeCode,
  } = req.body;
  try {
    const college = await collegeModel.findOne({ collegeCode });
    if (!college) {
      return res.status(404).json({ message: "College Code incorrect" });
    }
    const newFaculty = await facultyModel.create({
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
      collegeCode,
      // profileImage: image_filename,
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
