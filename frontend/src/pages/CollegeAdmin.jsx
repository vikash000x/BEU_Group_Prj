import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { noticeList, colleges } from "../lib/utils";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import Loader from "../components/loader/Loader";

const CollegeAdmin = () => {
  const [uploadingImage, setUploadingImage] = useState(null);
  const [noticeList, setNoticeList] = useState(null);
  const {
    singleCollege,
    setSingleCollege,
    setCollegeFacultyData,
    loading,
    setLoading,
    loggedInCollegeData
  } = useContext(StoreContext);

  const collegeShortName = "bce-bhagalpur";
  const currentCollegeId = "C001";

  //Function to handle image upload
  const handleImageUpload = () => {
    if (uploadingImage === 1) {
      //Gallery
      console.log("Calling API for type 1");
    } else if (uploadingImage === 2) {
      //Crousel
      console.log("Calling API for type 2");
    } else if (uploadingImage === 3) {
      //Front4
      console.log("Calling API for type 3");
    } else {
      console.error("Invalid type passed to handleImageUpload");
    }

    setUploadingImage(0);
  };

  useEffect(() => {
    const fetchAllNotices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/notice/getAllNotices",
          { withCredentials: true }
        );
        const result = response.data.notices.slice(-5).reverse();
        setNoticeList(result);
      } catch (error) {
        console.error("Error fetching notice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNotices();
  }, []);

  let filteredNoticeList = noticeList?.filter(
    (notice) => notice.CollegeId === currentCollegeId
  );
  if (filteredNoticeList?.length > 3) {
    filteredNoticeList = filteredNoticeList.slice(0, 3);
  }

  const fetchSingleCollege = () => {
    const singleCollegInfo = colleges.find(
      (colleg) => colleg.college_id === "001"
    );

    setSingleCollege(singleCollegInfo);
    setCollegeFacultyData(singleCollegInfo?.faculties);

    setLoading(false);
  };

  useEffect(() => {
    fetchSingleCollege();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-[1200px] flex flex-col items-center gap-4 py-4 mx-auto text-white">
      <div className="text-4xl font-bold text-blue-500 flex gap-2 my-1">
        <p>Welcome to</p>
        <p className="text-yellow-300">{`${loggedInCollegeData.name}`}</p>
        <p>Admin DashBoard</p>
      </div>
      {/*Table of Notice*/}
      <div className="flex w-full p-1 gap-1">
        <div className="w-1/2 bg-white text-black">
          <p className=" bg-white text-center font-semibold text-xl py-2">
            College Notices
          </p>
          <div className="flex-col bg-slate-700 text-white">
            {noticeList?.map((notice, index) => (
              <div
                className="border border-gray-400 p-3"
                key={notice._id}
              >{`${index}. ${notice.headline}`}</div>
            ))}
          </div>
        </div>
        <div className="w-1/2 bg-white text-black">
          <p className=" bg-white text-center font-semibold text-xl py-2">
            BEU Notices
          </p>
          <div className="flex-col bg-slate-700 text-white">
            {noticeList?.map((notice, index) => (
              <div
                className="border border-gray-400 p-3"
                key={notice._id}
              >{`${index}. ${notice.headline}`}</div>
            ))}
          </div>
        </div>
      </div>

      {/*Image Adding part */}
      <div className="w-full bg-slate-400 text-black text-center p-2 font-bold text-3xl rounded-lg my-2">
        Upload Images
      </div>
      <div className="bg-slate-700 w-full flex gap-4 text-xl font-semibold">
        <button
          onClick={() => setUploadingImage(1)}
          className="w-1/3 p-4 m-2 border border-cyan-200 hover:bg-yellow-400 hover:text-black"
        >
          Upload To Gallery
        </button>
        <button
          onClick={() => setUploadingImage(2)}
          className="w-1/3 p-4 m-2 border border-cyan-200 hover:bg-yellow-400 hover:text-black"
        >
          Upload To Crousel
        </button>
        <button
          onClick={() => setUploadingImage(3)}
          className="w-1/3 p-4 m-2 border border-cyan-200 hover:bg-yellow-400 hover:text-black"
        >
          Upload To Front4
        </button>
      </div>

      {/*Upload Image Form*/}
      {uploadingImage && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
    <div className="relative p-4 w-[400px] max-w-full h-[200px] bg-white rounded-3xl shadow-lg flex flex-col justify-center items-center">
      {/* Close Button */}
      <button
        onClick={() => setUploadingImage(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none text-2xl"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Heading */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Please select an image to upload
      </h2>

      {/* Form */}
      <form className="relative">
        <input type="file" className="block mb-4" />
        {/* Upload Button */}
        <button
          type="button"
          onClick={handleImageUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Upload Image
        </button>
      </form>
    </div>
  </div>
)
}
    </div>
  );
};

export default CollegeAdmin;
