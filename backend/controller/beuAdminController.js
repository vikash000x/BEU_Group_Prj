import notificationModel from "../models/notificationModel.js";

export const sendNotification = async(req, res) => {
    console.log("hi")
    try {
        const {
            topic,
            receiver,
            description,
        } = req.body;

        const newNotification = new notificationModel({
            topic, receiver, description
        });

        const savedNotification = await newNotification.save();

        res.status(201).json({
            message:"Notification saved successfully !",
            notification: savedNotification,
        });
    } catch (error) {
        res.status(500).json({ message: "Error while sending notification" });
    }
}