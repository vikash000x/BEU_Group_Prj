import studentModel from "../models/studentModel.js";
import collegeModel from "../models/collegeModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import studentProfileModel from "../models/studentProfileModel.js";

export const addStudent = async (req, res) => {
  const { name, branch, year, cgpa, regNo, gender, collegeId, password, semester, rollNo, dob } =
    req.body;
  
    if(!name, !branch, !year, !cgpa, !regNo, !gender, !collegeId, !password, !semester) {
      return res(500).json({message: "Please provide all fields"});
    }
  try {
    const college = await collegeModel.findOne({ _id: collegeId });
    if (!college) {
      return res.status(404).json({ message: "You are not registered by BEU" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sameRegNoStudent = await studentModel.findOne({regNo});
    if(sameRegNoStudent) {
      return res.status(500).json({ message: "A student is already registeres with same Registration No." });
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

    const newStudentProfile = await studentProfileModel.create({});
    newStudent.studentProfileId = newStudentProfile._id;
    await newStudent.save();

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
    return res.status(400).json({ message: "Please provide both Registration Number and Password" });
  }

  try {
    const student = await studentModel.findOne({ regNo }).populate("studentProfileId");
    if (!student) {
      return res.status(404).json({ message: "Student not found. Please check your Registration Number." });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { studentId: student._id, regNo: student.regNo },
      // process.env.JWT_SECRET,
      "amir",
      { expiresIn: "1d" } 
    );

    student.password="";


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