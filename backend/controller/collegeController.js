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
  const { image } = req.files;
  // const collegeimage = req.files?.image;
  try {
    const thumbnailImage = await uploadImageToCloudinary(image, "beu");
    const imagePaths = thumbnailImage.secure_url;
    const college = await collegeModel.findOne({ id });
    college.images.push(imagePaths);
    await college.save();
    res.json({
      message: "uploaded",
      updatedCollege,
      allcolleges,
    });
    console.log(thumbnailImage);
  } catch (error) {
    console.log("ji");
    console.log(error);
  }
};
