import notificationModel from "../models/notificationModel.js";
import BEUAdminModel from "../models/beuAdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const sendNotification = async (req, res) => {
  try {
    const { topic, receiver, description } = req.body;

    const newNotification = new notificationModel({
      topic,
      receiver,
      description,
    });

    const savedNotification = await newNotification.save();

    res.status(201).json({
      message: "Notification saved successfully !",
      notification: savedNotification,
    });
  } catch (error) {
    res.status(500).json({ message: "Error while sending notification" });
  }
};

export const beuAdminSignUp = async (req, res) => {
  try {
    const { name, email, phone, password, collegeCode } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newBEUAdmin = new BEUAdminModel({
      name,
      email,
      phone,
      password: hashedPassword,
      collegeCode,
    });

    newBEUAdmin.save();

    res.status(201).json({
      message: "BEU Admin account created success",
      data: newBEUAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "error creating beu admin", error });
  }
};

export const beuAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let beuAdmin = await BEUAdminModel.findOne({ email });

    if (!beuAdmin) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, beuAdmin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password does not match",
        success: false,
      });
    }

    let adminData = beuAdmin.toObject();
    delete adminData.password;

    const token = createToken(adminData._id);

    return res.status(200).json({
      message: "Login success",
      success: true,
      data: beuAdmin,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// export const postUpdate = (req, res) => {

//   const {}
// }