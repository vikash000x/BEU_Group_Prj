import express from "express";

import { beuAdminSignUp, sendNotification, beuAdminLogin } from "../controller/beuAdminController.js";

const beuAdminRouter = express.Router();

beuAdminRouter.post("/send-notification", sendNotification);
beuAdminRouter.post("/login", beuAdminLogin);

export default beuAdminRouter;