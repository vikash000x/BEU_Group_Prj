// import { uploadImageToCloudinary } from "../config/cloudinary.js";
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
  // const collegeimage = req.files?.image;
  let image_filename = `${req.file.filename}`;
  try {
    // const thumbnailImage = await uploadImageToCloudinary(
    //   collegeimage
    //   // process.env.FOLDER_NAME
    // );
    // const imagePaths = thumbnailImage.url;
    const updatedCollege = await collegeModel.findByIdAndUpdate(
      id, // 1. The ID of the document to update
      { $push: { images: image_filename } }, // 2. Update operation using $push
      { new: true }
      // id,
      // { $push: { images: { $each: [imagePaths] } } },
      // { new: true }
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
