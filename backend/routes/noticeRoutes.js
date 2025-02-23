import express from "express";
import {
  postNotice,
  editNotice,
  deleteNotice,
  getAllNotices,
  getCollegeWiseNotice,
} from "../controller/noticeController.js";

const noticeRouter = express.Router();
noticeRouter.post("/addNotice", postNotice);
noticeRouter.post("/editNotice/:id", editNotice);
noticeRouter.delete("/deleteNotice/:id", deleteNotice);
noticeRouter.get("/getAllNotices", getAllNotices);
noticeRouter.get("/get-college-wise-notice/:id", getCollegeWiseNotice);

export default noticeRouter;
