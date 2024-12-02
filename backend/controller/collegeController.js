import { uploadImageToCloudinary } from "../config/cloudinary.js";
import collegeModel from "../models/collegeModel.js";

export const addCollegeDetails = async (req, res) => {
  try {
    const { name, shortName, collegeCode, description } = req.body;

    const newCollege = new collegeModel({
      name,
      shortName,
      collegeCode,
      description,
    });

    const savedCollege = await newCollege.save();
    res.status(201).json({
      message: "College details added successfully",
      college: savedCollege,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadImage = async (req, res) => {
  const { id } = req.params;
  const { image } = req.files;
  try {
    const thumbnailImage = await uploadImageToCloudinary(
      image
      // process.env.FOLDER_NAME
    );
    const imagePaths = thumbnailImage.secure_url;
    const updatedCollege = await College.findByIdAndUpdate(
      id,
      { $push: { images: { $each: imagePaths } } },
      { new: true }
    );
    res.json({
      message: "uploaded",
      updatedCollege,
    });
    console.log(thumbnailImage);
  } catch (error) {
    console.log(error);
  }
};
