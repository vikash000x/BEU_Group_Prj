import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostNoticeForm = () => {

    const navigate = useNavigate();
    const collegeShortName = 'bce-bhagalpur';
  const [noticeData, setNoticeData] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
    targetAudience: '',
    attachments: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNoticeData((prevData) => ({
      ...prevData,
      attachments: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scroll animation
      });
    navigate(`/${collegeShortName}/admin`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 pt-4  bg-slate-800 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Post a Notice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={noticeData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-white">Description:</label>
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
          <label className="block text-white font-medium mb-2">Target Audience:</label>
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
          <label className="block text-white font-medium mb-2">Attachments (Optional):</label>
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
