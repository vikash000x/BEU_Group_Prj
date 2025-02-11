import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  collegeCode: {
    type: String,
    required: true,
  },
  chats: [
    {
      postedBy: {
        type: String,
      },
      message: {
        type: String,
      },
    },
  ],
});

const chatModel = mongoose.models.chat || mongoose.model("chat", chatSchema);
export default chatModel;
