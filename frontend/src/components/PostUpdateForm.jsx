import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import Loader from "./loader/Loader";

const PostNoticeForm = () => {
  const { url, loggedInCollegeData, loading, setLoading, editNoticeData, userType, loggedInBEUAdminData} =
    useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [fileData, setFileData] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [edit, setEdit] = useState("");
  const [noticeData, setNoticeData] = useState({
    headline: "",
    description: "",
    date: "",
    category: "",
    targetAudience: "",
    attachments: null,
    postedBy: "",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const editValue = queryParams.get("edit");
    if (editValue === "true") {
      setEdit(editValue);
      setNoticeData(editNoticeData);
    }
  }, [location.search, editNoticeData]);

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

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Add the collegeCode to the data before sending
    if(userType === "college") {
      noticeData.collegeCode = loggedInCollegeData.collegeCode;
      noticeData.postedBy = loggedInCollegeData.name;
    } else if(userType === "admin") {
      noticeData.collegeCode = loggedInBEUAdminData.collegeCode;
      noticeData.postedBy = loggedInBEUAdminData.name;
    }
    

    if (edit === "true") {
      try {
        if (thumbnail) {
          const formData1 = new FormData();
          formData1.append("image", thumbnail);

          // Upload the file and get the image URL
          const thumbnailUploadResponse = await axios.post(
            `${url}/college/upload-image`,
            formData1,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Set content type to multipart
              },
            }
          );

          noticeData.thumbnail = thumbnailUploadResponse.data.imageURL;
        }

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

          noticeData.attachments = imageUploadResponse.data.imageURL;
        }

        const response = await axios.post(
          `${url}/notice/editNotice/${editNoticeData._id}`,
          noticeData,
          {
            headers: {
              "Content-Type": "application/json", // JSON content type for the second request
            },
          }
        );
        setLoading(false);

        // Handle success and failure for adding the notice
        if (response.status === 200) {
          toast.success("Notice Updated Successfully !!");
          navigate(`/${loggedInCollegeData.collegeCode}/admin`); // Navigate to the admin page
        } else {
          toast.error("Failed to update notice!");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
        toast.error("Failed to edit notice");
      }
    } else {
      try {
        const formData1 = new FormData();
        formData1.append("image", thumbnail);

        // Upload the file and get the image URL
        const thumbnailUploadResponse = await axios.post(
          `${url}/college/upload-image`,
          formData1,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set content type to multipart
            },
          }
        );

        noticeData.thumbnail = thumbnailUploadResponse.data.imageURL;
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

          noticeData.attachments = imageUploadResponse.data.imageURL;
        }

        // After file URL (if any) is added to `noticeData`, send the final data to add the notice
        //console.log("jjjjjjjjjjifdfidbfdfd", noticeData)
        const response = await axios.post(
          `${url}/notice/addNotice`,
          noticeData,
          {
            headers: {
              "Content-Type": "application/json", // JSON content type for the second request
            },
          }
        );
        setLoading(false);

        // Handle success and failure for adding the notice
        if (response.status === 201) {
          toast.success("Notice Posted Successfully !!");
          navigate(`/${loggedInCollegeData.collegeCode}/admin`); // Navigate to the admin page
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
        toast.error("Failed to add notice");
      }
    }
  };

  return loading ? (
    <Loader />
  ) : (
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
            Thumbnail (Required):
          </label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleThumbnailChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
  );
};

export default PostNoticeForm;
