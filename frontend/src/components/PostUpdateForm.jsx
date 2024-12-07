import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import Loader from "./loader/Loader";

const PostNoticeForm = () => {
  const { url, loggedInCollegeCode, loading, setLoading } = useContext(StoreContext);
  const navigate = useNavigate();
  const collegeShortName = "bce-bhagalpur";
  const [fileData, setFileData] = useState(null);
  const [noticeData, setNoticeData] = useState({
    headline: "",
    description: "",
    date: "",
    category: "",
    targetAudience: "",
    attachments: null,
    postedBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileData(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Add the collegeCode to the data before sending
    noticeData.collegeCode = loggedInCollegeCode;

    try {
      if (fileData) {
        const formData = new FormData();
        formData.append("image", fileData);

        // Upload the file and get the image URL
        const imageUploadResponse = await axios.post(
          `${url}/college/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set content type to multipart
            },
          }
        );

        //not working bro
        // setNoticeData((prevData) => ({
        //   ...prevData,
        //   attachments: imageUploadResponse.data.imageURL, // Assuming the URL is returned in `imageURL`
        // }));

        noticeData.attachments = imageUploadResponse.data.imageURL;

        console.log("hi", noticeData.attachments)
        console.log("hi2", imageUploadResponse.data.imageURL)
        // console.log("api wala notice data", noticeData.attachments);
        // console.log('fileda', fileData)
      }

      // After file URL (if any) is added to `noticeData`, send the final data to add the notice
      const response = await axios.post(`${url}/notice/addNotice`, noticeData, {
        headers: {
          "Content-Type": "application/json", // JSON content type for the second request
        },
      });
      setLoading(false);

      // Handle success and failure for adding the notice
      if (response.status === 201) {
        toast.success("Notice Posted Successfully !!");
        navigate(`/${collegeShortName}/admin`); // Navigate to the admin page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error("Failed to add notice");
    }
  };

  return (
    
    loading ? <Loader />: (
      <div className="max-w-2xl mx-auto p-6 pt-4  bg-slate-800 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        Post a Notice
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">headline:</label>
          <input
            type="text"
            name="headline"
            value={noticeData.headline}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-white">
            Description:
          </label>
          <textarea
            name="description"
            value={noticeData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Date:</label>
          <input
            type="date"
            name="date"
            value={noticeData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Category:</label>
          <select
            name="category"
            value={noticeData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Choose category
            </option>
            <option value="Event">Event</option>
            <option value="Announcement">Announcement</option>
            <option value="Notice">Notice</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Target Audience:
          </label>
          <select
            name="targetAudience"
            value={noticeData.targetAudience}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Choose audience
            </option>
            <option value="Local">Local</option>
            <option value="Global">Global</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Attachments (Optional):
          </label>
          <input
            type="file"
            name="attachments"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0B192C] text-white py-2 rounded-md hover:bg-slate-700 transition duration-200"
        >
          Post Notice
        </button>
      </form>
    </div>
    )
  );
};

export default PostNoticeForm;
