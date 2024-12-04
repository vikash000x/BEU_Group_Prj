import collegeAdminModel from "../models/collegeAdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, "amir");
};

// BEU will register colleges
const registerCollege = async (req, res) => {
  const { collegename, collegecode, email, password } = req.body;
  try {
    const exists = await collegeAdminModel.findOne({ collegecode });
    if (exists) {
      return res.json({
        success: false,
        message: "College  already added",
      });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid email",
      });
    }

    // password length
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);
    const newCollegeAdmin = new collegeAdminModel({
      collegename: collegename,
      collegecode: collegecode,
      email: email,
      password: hashedPassword,
    });
    const collegeAdmin = await newCollegeAdmin.save();
    // const token = createToken(collegeAdmin._id);
    res.json({
      success: true,
      message: "College Added Successfully",
      collegeAdmin,
    });
  } catch (error) {
    console.log("Error->", error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

// BEU will remove colleges
const removeCollege = async (req, res) => {
  try {
    const { id } = req.params;

    await collegeAdminModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "College removed ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Delete college admin controller",
      error,
    });
  }
};
// COLLEGE will login itsefl

const loginCollege = async (req, res) => {
  const { collegecode, password } = req.body;
  try {
    const isCollege = await collegeAdminModel.findOne({ collegecode });
    if (!isCollege) {
      return res.json({
        success: false,
        message: "College is not registered ! contact to BEU",
      });
    }
    const isMatch = await bcrypt.compare(password, isCollege.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Inavalid credentials",
      });
    }

    const token = createToken(isCollege._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};
export { registerCollege, removeCollege, loginCollege };
