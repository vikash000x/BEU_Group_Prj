import noticeModel from "../models/noticeModel.js";

export const postNotice = async (req, res) => {
  try {
    const {
      collegeCode,
      headline,
      description,
      category,
      targetAudience,
      validUntil,
      department,
      postedBy,
      thumbnail,
    } = req.body;

    let uploadedFiles = [];
    if (req.body.attachments != null) {
      uploadedFiles.push(req.body.attachments);
    }

    const newNotice = new noticeModel({
      postedBy,
      collegeCode,
      headline,
      description,
      category,
      targetAudience,
      validUntil: validUntil || undefined,
      department: department || undefined,
      attachments: uploadedFiles,
      thumbnail,
    });

    const savedNotice = await newNotice.save();

    res.status(201).json({
      message: "Notice added successfully",
      notice: savedNotice,
    });
  } catch (error) {
    console.error("Error while adding notice:", error);
    res.status(500).json({ message: "Error while adding notice" });
  }
};

////////////////Controller for editing notice////////////
export const editNotice = async (req, res) => {
  try {
    const { id } = req.params; // Notice ID to update
    const {
      headline,
      description,
      category,
      targetAudience,
      validUntil,
      department,
      thumbnail,
    } = req.body;

    const files = req.files?.attachments || [];
    const uploadedFiles = [];

    // Handle new file uploads to Cloudinary
    //   for (const file of files) {
    //     const uploadedFile = await uploadToCloudinary(file);
    //     uploadedFiles.push(uploadedFile.secure_url);
    //   }

    // Update the notice
    const updatedNotice = await noticeModel.findByIdAndUpdate(
      id,
      {
        ...(headline && { headline }),
        ...(description && { description }),
        ...(category && { category }),
        ...(targetAudience && { targetAudience }),
        ...(validUntil && { validUntil }),
        ...(department && { department }),
        ...(thumbnail) && {thumbnail},
        ...(files.length > 0 && { attachments: uploadedFiles }),
      },
      { new: true }
    );

    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json({
      message: "Notice updated successfully",
      notice: updatedNotice,
    });
  } catch (error) {
    console.error("Error while editing notice:", error);
    res.status(500).json({ message: "Error while editing notice" });
  }
};

////////////////////////////////////////////
export const deleteNotice = async (req, res) => {
  try {
    //const { id } = req.params;// ID of the notice to delete
    const { id } = req.params; // ID of the notice to delete
    // Find and delete the notice by ID
    const deletedNotice = await noticeModel.findByIdAndDelete(id);

    //If no notice is found with the given ID
    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json({
      message: "Notice deleted successfully",
      notice: deletedNotice, // Returning the deleted notice for reference
    });
  } catch (error) {
    console.error("Error while deleting notice:", error);
    res.status(500).json({ message: "Error while deleting notice" });
  }
};

export const getAllNotices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const totalNotices = await noticeModel.countDocuments();
    const totalPages = Math.ceil(totalNotices / limit);

    const notices = await noticeModel
      .find()
      .sort({ postedAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Notices fetched successfully",
      notices,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalNotices,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error while fetching notices:", error);
    res.status(500).json({ message: "Error while fetching notices" });
  }
};

export const getCollegeWiseNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notices = await noticeModel.find({ collegeCode: id });
    if (!notices) {
      return res.json({
        message: "No notice belongs to this college",
      });
    }
    res.json({
      succeess: true,
      notices,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error while fetching notice college wise",
    });
  }
};
