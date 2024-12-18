import express from "express";
import {
  loginStartup,
  registerStartup,
} from "../controller/collegeAdminController.js";

const startupRouter = express.Router();

startupRouter.post("/register-startup", registerStartup);
startupRouter.post("/login-startup", loginStartup);

export default startupRouter;
