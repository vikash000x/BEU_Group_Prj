import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const StudyMaterial = () => {
  const { url } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    title: "",  
    description: "",
    type: "pdf",
    semester: "",
    subject: "",
    url: "",
    uploadedBy: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${url}/college/create-study-material`, formData);
      setMessage("Study material uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        type: "pdf",
        semester: "",
        subject: "",
        url: "",
        uploadedBy: "",
      });
    } catch (error) {
      console.error("Error uploading study material:", error);
      setMessage("Failed to upload study material.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Study Material</h2>
      {message && (
        <div className="mb-4 text-center text-sm text-blue-600">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title *"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black p-2"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black p-2"
        >
          <option value="pdf">PDF</option>
          <option value="handwritten">Handwritten</option>
          <option value="video">Video</option>
        </select>
        <input
          type="number"
          name="semester"
          placeholder="Semester *"
          value={formData.semester}
          onChange={handleChange}
          required
          className="w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black p-2"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject *"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black p-2"
        />
        <input
          type="text"
          name="url"
          placeholder="URL *"
          value={formData.url}
          onChange={handleChange}
          required
          className="w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black p-2"
        />
        <input
          type="text"
          name="uploadedBy"
          placeholder="Uploaded By *"
          value={formData.uploadedBy}
          onChange={handleChange}
          required
          className="w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>   
      </form>
    </div>
  );
};

export default StudyMaterial;