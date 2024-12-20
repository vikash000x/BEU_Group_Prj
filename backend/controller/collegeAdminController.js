import collegeAdminModel from "../models/collegeAdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import collegeModel from "../models/collegeModel.js";
import startupRegistrationModel from "../models/startupRegistrationModel.js";
import startupModel from "../models/startupModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, "amir", {
    expiresIn: "1d",
  });
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
    console.log(collegeAdmin);
    const newCollege = new collegeModel({
      name: collegename,
      collegeCode: collegecode,
    });

    const createdCollege = await newCollege.save();
    // const token = createToken(collegeAdmin._id);
    res.json({
      success: true,
      message: "College Added Successfully",
      collegeAdmin,
      createdCollege,
    });
  } catch (error) {
    console.log("Error->", error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const registerStartup = async (req, res) => {
  const { startupName, email, password } = req.body;
  try {
    const exists = await startupRegistrationModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "Startup  already added",
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
    const newStartupRegistered = await new startupRegistrationModel({
      startupName: startupName,
      email: email,
      password: hashedPassword,
    }).save();
    const newStartup = await new startupModel({
      startupName: startupName,
      email: email,
    }).save();

    res.json({
      success: true,
      message: "Startup registered Successfully",
      newStartupRegistered,
      newStartup,
    });
  } catch (error) {
    console.log("Error->", error);
    res.json({
      success: false,
      message: "Error while registering startup",
    });
  }
};

// get all reistered college
const getAllRegisteredCollege = async (req, res) => {
  try {
    const registeredColleges = await collegeAdminModel.find();
    if (!registeredColleges) {
      return res.json({
        message: "No registered college found",
      });
    }
    res.json({
      success: "true",
      message: "fetched all colleges",
      registeredColleges,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "something went wrong",
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

    let collegeData = null;

    try {
      collegeData = await collegeModel.findOne({ collegeCode: collegecode }).populate("images").populate("headImage");
      if (!collegeData) {
        return res.json({
          success: false,
          message: "College data not found ! contact to BEU",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Error",
      });
    }

    const token = createToken(collegeData._id);
    res.json({
      success: true,
      token,
      collegeData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};
const loginStartup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isRegister = await startupRegistrationModel.findOne({ email });
    if (!isRegister) {
      return res.json({
        success: false,
        message: "Startup is not registered ! contact to BEU",
      });
    }
    const isMatch = await bcrypt.compare(password, isRegister.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Inavalid credentials",
      });
    }

    const isStartUp = await startupModel.findOne({ email });
    if (!isStartUp) {
      return res.json({
        success: false,
        message: "startup not fount",
      });
    }

    const token = createToken(isStartUp._id);
    res.json({
      success: true,
      token,
      isStartUp,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

// register startup
export {
  registerCollege,
  removeCollege,
  loginCollege,
  getAllRegisteredCollege,
  registerStartup,
  loginStartup,
};
