import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary's v2 object

export const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      //!    ########   Configuring the Cloudinary to Upload MEDIA ########
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (error) {
    console.error(error); // Changed to console.error for better error logging
  }
};

export default cloudinary;

export const uploadImageToCloudinary = async (
  file,
  folder,
  height,
  quality
) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  console.log("OPTIONS", options);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
