import { uploadImageToCloudinary } from "../config/cloudinary.js";
import galleryModel from "../models/galleryModel.js";
import collegeModel from "../models/collegeModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addCollegeDetails = async (req, res) => {
  try {
    const { collegeCode, description, extraInfo, phone, address, email } =
      req.body;

    const college = await collegeModel.findOneAndUpdate(
      { collegeCode },
      { description, extraInfo, phone, address, email },
      { new: true }
    );
    if (!college) {
      return res.status(404).json({ message: "college not found" });
    }
    res.status(201).json({
      message: "College details updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getSingleCollege = async (req, res) => {
  const { collegeCode } = req.body;
  try {
    const college = await collegeModel
      .findOne({ collegeCode })
      .populate("students")
      .populate("faculties")
      .populate("images")
      .populate("headImage");
    res.json({
      college,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: "while getting single college",
    });
  }
};
export const getAllCollege = async (req, res) => {
  try {
    const colleges = await collegeModel
      .find()
      .populate("students")
      .populate("faculties")
      .populate("images")
      .populate("headImage");
    res.json({
      success: true,
      colleges,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: "error while getting all college",
    });
  }
};
export const uploadCarousel = async (req, res) => {
  try {
    const { collegeId } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const { image } = req.files;

    const college = await collegeModel.findOne({ collegeId });
    if (!college) {
      return res.status(404).json({ message: "College Code incorrect" });
    }
    const thumbnailImage = await uploadImageToCloudinary(image, "beu");
    const imagePaths = thumbnailImage.secure_url;
    college.crouselImage.push(imagePaths);
    await college.save();

    res.json({
      success: true,
      message: "Carousel image uploaded successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while uploading the carousel image",
      error: error.message,
    });
  }
};

export const deleteCarouselImage = async (req, res) => {
  try {
    // send only image url
    const { collegeId, imageUrl } = req.body;

    if (!collegeCode || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "College code and image URL are required",
      });
    }

    const college = await collegeModel.findOne({ collegeId });
    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found with the provided code",
      });
    }

    const imageIndex = college.crouselImage.indexOf(imageUrl);
    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Image URL not found in the carousel",
      });
    }

    // Remove the image from the array
    college.crouselImage.splice(imageIndex, 1);

    // Delete the image from Cloudinary
    const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID from the URL
    await cloudinary.uploader.destroy(publicId);

    await college.save();

    res.json({
      success: true,
      message: "Carousel image deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the carousel image",
      error: error.message,
    });
  }
};

export const uploadHeadImage = async (req, res) => {
  try {
    const { name, collegeCode, collegeId, info } = req.body;

    if (!name || !info) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const college = await collegeModel.findOne({ collegeId });
    if (!college) {
      return res.json({ message: "colllege not found" });
    }

    const { image } = req.files;
    const thumbnailImage = await uploadImageToCloudinary(image, "beu");
    const imagePaths = thumbnailImage.secure_url;
    const newGalleryEntry = new galleryModel({
      name,
      collegeCode,
      url: imagePaths,
      info,
    });
    await newGalleryEntry.save();
    college.headImage.push(newGalleryEntry._id);
    await college.save();
    res.status(201).json({
      success: true,
      message: "Gallery entry created successfully",
      data: newGalleryEntry,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while uploading the carousel image",
      error: error.message,
    });
  }
};

export const deleteHeadImage = async (req, res) => {
  try {
    const { galleryId, collegeId } = req.body;

    const galleryEntry = await galleryModel.findById(galleryId);
    if (!galleryEntry) {
      return res.status(404).json({
        success: false,
        message: "Gallery entry not found",
      });
    }

    // const collegeCode = galleryEntry.collegeCode;
    const college = await collegeModel.findOne({ collegeId });
    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found with the provided code",
      });
    }

    const index = college.headImage.indexOf(galleryId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Gallery ID not found in the college's head images",
      });
    }
    college.headImage.splice(index, 1);

    // Delete the image from Cloudinary
    const publicId = galleryEntry.url
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    // Delete the gallery entry from the database
    await galleryModel.findByIdAndDelete(galleryId);

    await college.save();

    res.json({
      success: true,
      message: "Head image deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the head image",
      error: error.message,
    });
  }
};

export const uplaoadGalleryImage = async (req, res) => {
  try {
    const { name, collegeCode, collegeId, info } = req.body;

    if (!name || !collegeCode || !info) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const college = await collegeModel.findOne({ collegeId });
    if (!college) {
      return res.json({ message: "colllege not found" });
    }

    const { image } = req.files;
    const thumbnailImage = await uploadImageToCloudinary(image, "beu");
    const imagePaths = thumbnailImage.secure_url;
    const newGalleryEntry = new galleryModel({
      name,
      collegeCode,
      url: imagePaths,
      info,
    });
    await newGalleryEntry.save();
    college.images.push(newGalleryEntry._id);
    await college.save();
    res.status(201).json({
      success: true,
      message: "Gallery entry created successfully",
      data: newGalleryEntry,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the gallery entry",
      error: error.message,
    });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const { galleryId } = req.body;

    const galleryEntry = await galleryModel.findById(galleryId);
    if (!galleryEntry) {
      return res.status(404).json({
        success: false,
        message: "Gallery entry not found",
      });
    }

    const collegeCode = galleryEntry.collegeCode;
    const college = await collegeModel.findOne({ collegeCode });
    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found with the provided code",
      });
    }

    const index = college.images.indexOf(galleryId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Gallery ID not found in the college's head images",
      });
    }
    college.images.splice(index, 1);

    // Delete the image from Cloudinary
    const publicId = galleryEntry.url
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    // Delete the gallery entry from the database
    await galleryModel.findByIdAndDelete(galleryId);

    await college.save();

    res.json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the gallery image",
      error: error.message,
    });
  }
};
