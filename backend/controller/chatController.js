import chatModel from "../models/chatModel.js";
import { uploadImageToCloudinary } from "../config/cloudinary.js";

export const postChat = async (req, res) => {
  try {
    const { collegeCode, postedBy, message, mediaUrl, mediaType } = req.body;

    // Validate request
    if (!collegeCode || !postedBy || (!message && !mediaUrl)) {
      return res.status(400).json({ 
        success: false,
        error: "Message or media is required" 
      });
    }

    // Find the chat document by collegeCode
    let chat = await chatModel.findOne({ collegeCode });

    if (!chat) {
      // If no chat exists, create a new document
      chat = new chatModel({ collegeCode, chats: [] });
    }

    // Append the new message
    chat.chats.push({
      postedBy,
      message,
      mediaUrl,
      mediaType,
      timestamp: new Date()
    });

    // Save to database
    await chat.save();

    return res.status(201).json({ success: true, chat });
  } catch (error) {
    console.error("Error posting chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadMedia = async (req, res) => {
  try {
    console.log('Upload request received:', req.files);

    if (!req.files || !req.files.file) {
      console.log('No file in request');
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded' 
      });
    }

    const file = req.files.file;
    console.log('File details:', {
      name: file.name,
      type: file.mimetype,
      size: file.size,
      tempFilePath: file.tempFilePath
    });
    
    // Validate file type
    const fileType = file.mimetype;
    if (!fileType.startsWith('image/') && !fileType.startsWith('video/')) {
      console.log('Invalid file type:', fileType);
      return res.status(400).json({ 
        success: false,
        error: 'Invalid file type. Only images and videos are allowed.' 
      });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      console.log('File too large:', file.size);
      return res.status(400).json({
        success: false,
        error: 'File too large. Maximum size is 10MB.'
      });
    }

    console.log('Attempting Cloudinary upload...');
    // Upload to Cloudinary
    const result = await uploadImageToCloudinary(
      file,
      'chat',  // folder name in Cloudinary
      1080,    // height (optional)
      90       // quality (optional)
    );

    console.log('Cloudinary upload result:', result);

    // Return the Cloudinary URL and type
    res.json({
      success: true,
      url: result.secure_url,
      type: fileType.startsWith('image/') ? 'image' : 'video'
    });
  } catch (error) {
    console.error('Detailed upload error:', {
      message: error.message,
      stack: error.stack,
      details: error.response?.data || error
    });
    res.status(500).json({ 
      success: false,
      error: 'Error uploading file. Please try again.',
      details: error.message
    });
  }
};

export const getChatByCollege = async (req, res) => {
  try {
    const collegeCode = req.params;

    const chat = await chatModel.find(collegeCode);

    if (!chat) {
      return res.json({
        success: false,
        message: "no chat exist",
      });
    }
    console.log(chat[0]?.collegeCode);
    console.log(chat);
    res.json({
      success: true,
      chat: chat[0].chats,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while creating chat",
    });
  }
};
