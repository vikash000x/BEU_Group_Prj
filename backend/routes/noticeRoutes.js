import express from "express";
import {
    postNotice,
    editNotice,
    deleteNotice,
    getAllNotices
} from "../controller/noticeController.js";

const noticeRouter = express.Router();
noticeRouter.post("/addNotice", postNotice)
noticeRouter.post("/editNotice", editNotice)
noticeRouter.delete("/deleteNotice", deleteNotice)
noticeRouter.get("/getAllNotices", getAllNotices);

export default noticeRouter;