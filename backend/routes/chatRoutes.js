import express from "express";
import { getChatByCollege, postChat } from "../controller/chatController.js";

const chatRouter = express.Router();

chatRouter.post("/post-chat", postChat);
chatRouter.get("/get-chat/:collegeCode", getChatByCollege);

export default chatRouter;
