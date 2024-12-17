import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://teamproject0024:y7MXk1Vzb1YbxydL@cluster0.fg8ak.mongodb.net/BEU-DATABASE"
    )
    .then(() => console.log("db connected successfully"));
};
