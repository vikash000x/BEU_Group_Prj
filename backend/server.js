import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { connectDB } from "./config/db.js";
import collegeAdminRouter from "./routes/collegAdminRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import collegeRouter from "./routes/collegeRoutes.js";
import noticeRouter from "./routes/noticeRoutes.js";
import { cloudinaryConnect } from "./config/cloudinary.js";
import jobRouter from "./routes/jobRoutes.js";
import facultyRouter from "./routes/facultyRoutes.js";
import startupRouter from "./routes/startupRoutes.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();

const port = 4000;

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connecting to cloudinary
cloudinaryConnect();

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));
connectDB();

app.use("/api/collegeadmin", collegeAdminRouter);
app.use("/api/college", collegeRouter);
app.use("/api/student", studentRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/job", jobRouter);
app.use("/api/notice", noticeRouter);
app.use("/api/startup", startupRouter);
app.get("/", (req, res) => {
  res.send("API working");
});
app.listen(port, () => {
  console.log("Server started ");
});
