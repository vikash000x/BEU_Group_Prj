import express from "express";

import { sendNotification } from "../controller/beuAdminController.js";

const beuAdminRouter = express.Router();

beuAdminRouter.post("/send-notification", sendNotification);

export default beuAdminRouter;