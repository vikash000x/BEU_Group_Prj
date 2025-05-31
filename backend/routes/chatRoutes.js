import express from "express";
import { getChatByCollege, postChat, uploadMedia } from "../controller/chatController.js";

const chatRouter = express.Router();

// Chat message routes
chatRouter.post("/post-chat", postChat);
chatRouter.get("/get-chat/:collegeCode", getChatByCollege);

// Media upload route
chatRouter.post("/upload-media", uploadMedia);

export default chatRouter;
