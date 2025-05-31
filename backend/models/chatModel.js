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
        required: true
      },
      message: {
        type: String,
        default: ""
      },
      mediaUrl: {
        type: String,
        default: null
      },
      mediaType: {
        type: String,
        enum: ['image', 'video', null],
        default: null
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    },
  ],
});

const chatModel = mongoose.models.chat || mongoose.model("chat", chatSchema);
export default chatModel;
