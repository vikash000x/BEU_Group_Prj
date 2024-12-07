import studentModel from "../models/studentModel.js";
import collegeModel from "../models/collegeModel.js";

export const addStudent = async (req, res) => {
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
  const { collegeId } = req.query;

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

// Example route to add a student
// app.post("/add-student", async (req, res) => {
//   try {
//     const { college_id, student } = req.body;

//     // Find the college
//     const college = await College.findOne({ college_id });
//     if (!college) {
//       return res.status(404).json({ message: "College not found" });
//     }

//     // Create the student
//     const newStudent = await Student.create(student);

//     // Add student ID to the college
//     college.students.push(newStudent._id);
//     await college.save();

//     res.status(200).json({ message: "Student added", college });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// const addFood = async (req, res) => {
//   let image_filename = `${req.file.filename}`;
//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     category: req.body.category,
//     image: image_filename,
//   });

//   try {
//     await food.save();
//     res.json({
//       success: true,
//       message: "Food added",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };
