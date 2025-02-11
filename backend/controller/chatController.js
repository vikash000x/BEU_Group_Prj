import chatModel from "../models/chatModel.js";

export const postChat = async (req, res) => {
  try {
    const { collegeCode, postedBy, message } = req.body;

    // Validate request
    if (!collegeCode || !postedBy || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the chat document by collegeCode
    let chat = await chatModel.findOne({ collegeCode });

    if (!chat) {
      // If no chat exists, create a new document
      chat = new chatModel({ collegeCode, chats: [] });
    }

    // Append the new message
    chat.chats.push({ postedBy, message });

    // Save to database
    await chat.save();

    return res.status(201).json({ success: true, chat });
  } catch (error) {
    console.error("Error posting chat:", error);
    res.status(500).json({ error: "Internal server error" });
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
