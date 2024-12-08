import { uploadImageToCloudinary } from "./cloudinary.js";

export const uploadImage = async (req, res) => {
    const { image } = req.files;
    try {
      const thumbnailImage = await uploadImageToCloudinary(image, "beu");
      const imagePaths = thumbnailImage.secure_url;
      res.json({
        imageURL: imagePaths,
        message: "Image uploaded successfully",
      });
    } catch (error) {
      console.log("error->", error);
    }
  };