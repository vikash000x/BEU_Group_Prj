import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary's v2 object
import fs from "fs";
// export const cloudinaryConnect = () => {
//   try {

cloudinary.config({
  cloud_name: "dmzgb9hm5",
  api_key: 897861628164346,
  api_secret: "IAue_rUndKSyjpmgBXIZ5iL-69M",
});
//   } catch (error) {
//     console.error(error); // Changed to console.error for better error logging
//   }
// };

// export default cloudinary;

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

// export const uploadImageToCloudinary = async (
//   file,
//   folder,
//   height,
//   quality
// ) => {
//   const options = { folder };
//   if (height) {
//     options.height = height;
//   }
//   if (quality) {
//     options.quality = quality;
//   }
//   options.resource_type = "auto";
//   console.log("OPTIONS", options);
//   return await cloudinary.uploader.upload(file.tempFilePath, options);
// };
