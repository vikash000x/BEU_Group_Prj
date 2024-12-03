import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary's v2 object

export const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      //!    ########   Configuring the Cloudinary to Upload MEDIA ########
      cloud_name: "dmzgb9hm5",
      api_key: 897861628164346,
      api_secret: "IAue_rUndKSyjpmgBXIZ5iL-69M",
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
