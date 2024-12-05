import studentModel from "../models/studentModel.js";
import collegeModel from "../models/collegeModel.js";
import facultyModel from "../models/facultyModel.js";

export const addFaculty = async (req, res) => {
  const { name, branch, year, grade, cgpa, collegeCode } = req.body;
  try {
    const college = await collegeModel.findOne({ collegeCode });
    if (!college) {
      return res.status(404).json({ message: "You are not registered by BEU" });
    }
    const newStudent = await studentModel.create({
      name,
      branch,
      year,
      grade,
      cgpa,
      // profileImage: image_filename,
    });
    college.students.push(newStudent._id);
    await college.save();

    res.status(200).json({ message: "Student added", college });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// this controller for college admin
export const updateStudent = async (req, res) => {
  const { studentId } = req.params; // Extract studentId from route parameters
  const { name, branch, year, grade, cgpa } = req.body; // Extract updated fields from request body

  try {
    // Update the student by ID
    const updatedStudent = await studentModel.findByIdAndUpdate(
      studentId,
      { name, branch, year, grade, cgpa }, // Fields to update
      { new: true } // Options: Return the updated document and validate the data
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

// Controller to delete a student , a college will delete the student
export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Find the student by ID
    const student = await studentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the associated college
    const college = await collegeModel.findOne({ students: studentId });
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
