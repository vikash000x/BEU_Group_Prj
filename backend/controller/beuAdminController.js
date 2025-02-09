import notificationModel from "../models/notificationModel.js";
import BEUAdminModel from "../models/beuAdminModel.js";
import bcrypt from "bcryptjs";

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
  const { name, email, phone, password } = req.body;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newBEUAdmin = new BEUAdminModel({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  newBEUAdmin.save();
  
  res.status(201).json({
    message: "BEU Admin account created success",
    notification: newBEUAdmin,
  });
} catch (error) {
  res.status(500).json({ message: "error creating beu admin", error });
}
};

export const beuAdminLogin = async(req, res) => {

  try {
    const {adminId, password} = req.body;

    const beuAdmin = await BEUAdminModel.find({email: adminId});

    if(beuAdmin) {
      console.log("hi", beuAdmin);
    }

    return res.status(201).json({
      message: "login success",
      success: true
    })
  } catch (error) {
    //
  }
}