import collegeModel from "../models/collegeModel.js";

export const addCollegeDetails = async (req, res) => {
  try {
    const { name, shortName, collegeCode, description } = req.body;

    const newCollege = new collegeModel({
      name,
      shortName,
      collegeCode,
      description,
    });

    const savedCollege = await newCollege.save();
    res.status(201).json({
      message: "College details added successfully",
      college: savedCollege,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
