import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader/Loader";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const CollegeAdmin = () => {
  const [uploadingImage, setUploadingImage] = useState(null);
  const [noticeList, setNoticeList] = useState(null);
  const [activeSection, setActiveSection] = useState("collegeNotices");
  const [fileData, setFileData] = useState(null);
  const [inputName, setInputName] = useState("");
  const [info, setInfo] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [logoutModal, setLogoutModal] = useState(false);
  const [imageActiveSection, setImageActiveSection] = useState("gallery");
  const navigate = useNavigate();

  const {
    loading,
    setLoading,
    loggedInCollegeData,
    setloggedInCollegeData,
    url,
    setEditNoticeData,
    setUserType,
    token,
    setToken,
  } = useContext(StoreContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  //Image Upload
  const handleImageUpload = async () => {
    if (fileData) {
      setLoading(true);
      const imageData = new FormData();
      imageData.append("image", fileData);
      imageData.append("collegeCode", loggedInCollegeData?.collegeCode);
      imageData.append("collegeId", loggedInCollegeData?._id);
      if (uploadingImage === 1) {
        //Gallery
        imageData.append("name", inputName);
        imageData.append("info", info);
        try {
          const response = await axios.post(
            `${url}/college/upload-gallery`,
            imageData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Set content type to multipart
                token,
              },
            }
          );
          console.log("Gallery upload success", response);
          toast.success("Gallery image uploaded successfully !");
        } catch (error) {
          console.log("error while postingGalleryl image", error);
          toast.error("Error while uploading Gallery image !");
        }
      } else if (uploadingImage === 2) {
        //Crousel
        try {
          const response = await axios.post(
            `${url}/college/upload-crousel`,
            imageData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Set content type to multipart
                token,
              },
            }
          );
          console.log("crousel upload success", response);
          toast.success("Cousel image uploaded successfully !");
        } catch (error) {
          console.log("error while posting crousel image", error);
          toast.error("Error while uploading Crousel image !");
        }
      } else if (uploadingImage === 3) {
        //Gallery
        imageData.append("name", inputName);
        imageData.append("info", info);
        try {
          const response = await axios.post(
            `${url}/college/upload-head-image`,
            imageData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Set content type to multipart
                token,
              },
            }
          );
          console.log("Front4 upload success", response);
          toast.success("Front4 image uploaded successfully !");
        } catch (error) {
          console.log("error while posting Front4 image", error);
          toast.error("error while posting Front4 image !");
        }
      } else {
        console.error("Invalid type passed to handleImageUpload");
      }
    }
    setInputName("");
    setInfo("");
    setFileData(null);
    setLoading(false);
    setUploadingImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setInputName(value);
    }
    if (name === "info") {
      setInfo(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileData(file);
  };

  const handleEditNotice = (notice) => {
    setEditNoticeData(notice);
    navigate(`/collegeShortName/post-update/?edit=true`);
  };

  const handleDeleteNotice = async (id) => {
    try {
      const response = await axios.delete(`${url}/notice/deleteNotice/${id}`);
      toast.success("Notice deleted successfully !");
      setNoticeList((prevList) =>
        prevList.filter((notice) => notice._id !== id)
      );
    } catch (error) {
      console.log("error while deleting notice", error);
      toast.error("error while deleting notice!");
    }
  };

  const handleViewImage = async () => {
    setLoading(true);
    setActiveSection("viewImages");
    setLoading(false);
  };

  useEffect(() => {
    const fetchAllNotices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/notice/getAllNotices",
          { withCredentials: true }
        );
        const result = response.data.notices.reverse();
        //const result = response.data.notices.slice(-5).reverse();
        setNoticeList(result);
      } catch (error) {
        console.error("Error fetching notice:", error);
      } finally {
        setLoading(false);
        setInputName("");
        setInfo("");
      }
    };

    fetchAllNotices();
  }, []);

  let filteredNoticeList = noticeList?.filter(
    (notice) => notice?.collegeCode === loggedInCollegeData?.collegeCode
  );

  //Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInCollegeData");
    localStorage.removeItem("userType");
    setloggedInCollegeData(null);
    setUserType(null);
    setToken(null);
    setLogoutModal(false);
    toast.success("Logged Out Successfully");
    navigate(`/`);
  };

  const handleImageDelete = async (type, img) => {
    //console.log(type, img._id);
    const formData = new FormData();
    formData.append("collegeId", loggedInCollegeData._id);
    formData.append("galleryId", img._id);
    if (type === "gallery") {
      try {
        const response = await axios.delete(
          `${url}/college/delete-gallery-image`,
          {
            data: formData,
            headers: {
              token,
            },
          }
        );
        toast.success(response.data.message);
      } catch (e) {
        console.log("ytyhfgch", e);
        toast.error("Failed to delete gallery image");
      }
    } else if (type === "crousel") {
      //
    } else if (type === "front4") {
      //
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex w-[1200px] py-4 mx-auto text-white">
      {/* Sidebar */}
      <div className="w-1/4 min-h-screen bg-slate-800 p-4 flex flex-col gap-4">
        <div className="text-xl font-bold text-blue-500 gap-2 my-1">
          <p className="text-yellow-300">{`${loggedInCollegeData?.name}`}</p>
          <p>Admin DashBoard</p>{" "}
        </div>
        <button
          className={`p-2 text-left ${
            activeSection === "collegeNotices" && "bg-blue-500"
          }`}
          onClick={() => setActiveSection("collegeNotices")}
        >
          College Notices
        </button>
        <button
          className={`p-2 text-left ${
            activeSection === "beuNotices" && "bg-blue-500"
          }`}
          onClick={() => setActiveSection("beuNotices")}
        >
          BEU Notices
        </button>
        <button
          className={`p-2 text-left ${
            activeSection === "uploadImages" && "bg-blue-500"
          }`}
          onClick={() => setActiveSection("uploadImages")}
        >
          Upload Images
        </button>
        <button
          className={`p-2 text-left ${
            activeSection === "viewImages" && "bg-blue-500"
          }`}
          onClick={() => handleViewImage()}
        >
          View Images
        </button>
        <button
          className={`p-2 text-left ${
            activeSection === "updateCollege" && "bg-blue-500"
          }`}
          onClick={() => setActiveSection("updateCollege")}
        >
          Update College Info
        </button>
        <button
          className={`p-2 text-left ${
            activeSection === "logout" && "bg-blue-500"
          }`}
          onClick={() => setLogoutModal(true)}
        >
          LogOut
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        {activeSection === "collegeNotices" && (
          <div>
            <h2 className="text-xl font-bold pb-4">
              Notices Posted By College :
            </h2>
            <div className="bg-slate-700 text-white">
              {filteredNoticeList?.map((notice, index) => (
                <div className="flex justify-between border border-gray-400 p-3">
                  <div
                    className="cursor-pointer"
                    key={notice._id}
                    onClick={() => setSelectedNotice(notice)}
                  >
                    {`${index + 1}. ${notice.headline}`}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleEditNotice(notice)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteNotice(notice._id)}>
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "beuNotices" && (
          <div>
            <h2 className="text-xl font-bold pb-4">BEU Notices</h2>
            <div className="bg-slate-700 text-white">
              {noticeList?.map((notice, index) => (
                <div
                  className="border border-gray-400 p-3"
                  key={notice._id}
                >{`${index + 1}. ${notice.headline}`}</div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "uploadImages" && (
          <div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2 bg-slate-800 rounded-lg p-2">
                <p className="text-center text-2xl font-semibold">
                  Gallery Section
                </p>
                <button
                  onClick={() => setUploadingImage(1)}
                  className="bg-white text-black font-medium rounded-md p-4 m-2 mx-32 border hover:bg-yellow-400 hover:text-black"
                >
                  Upload To Gallery
                </button>
                <Link to="/">
                  <p className="w-full text-center underline opacity-80">
                    Click here to view Gallery images {">>"}
                  </p>
                </Link>
              </div>

              <div className="border-1 border-gray-500 rounded-full border-b-2"></div>

              <div className="flex flex-col gap-2 bg-slate-800 rounded-lg p-2">
                <p className="text-center text-2xl font-semibold">
                  Crousel Section
                </p>
                <button
                  onClick={() => setUploadingImage(2)}
                  className="bg-white text-black font-medium rounded-md p-4 m-2 mx-32 border hover:bg-yellow-400 hover:text-black"
                >
                  Upload To Crousel
                </button>
                <Link to="/">
                  <p className="w-full text-center underline opacity-80">
                    Click here to view Crousel images {">>"}
                  </p>
                </Link>
              </div>

              <div className="border-1 border-gray-500  rounded-full border-b-2"></div>

              <div className="flex flex-col gap-2 bg-slate-800 rounded-lg p-2">
                <p className="text-center text-2xl font-semibold">
                  Front4 Section
                </p>
                <button
                  onClick={() => setUploadingImage(3)}
                  className="bg-white text-black font-medium rounded-md p-4 m-2 mx-32 border hover:bg-yellow-400 hover:text-black"
                >
                  Upload To Front4
                </button>
                <Link to="/">
                  <p className="w-full text-center underline opacity-80">
                    Click here to view Front4 images {">>"}
                  </p>
                </Link>
              </div>
            </div>

            {uploadingImage && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
                <div className="relative p-4 w-[400px] max-w-full h-auto bg-white rounded-3xl shadow-lg flex flex-col justify-center items-center">
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
                  <form className="relative flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="name"
                      value={inputName}
                      name="name"
                      onChange={handleChange}
                      className="border border-slate-500 rounded-sm text-black pl-1"
                    ></input>
                    <input
                      type="text"
                      placeholder="info"
                      value={info}
                      name="info"
                      onChange={handleChange}
                      className="border border-slate-500 rounded-sm text-black pl-1"
                    ></input>

                    <input
                      type="file"
                      className="block mb-4"
                      onChange={handleFileChange}
                    />
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
            )}
          </div>
        )}

        {activeSection === "updateCollege" && (
          <div>
            <h2 className="text-xl font-bold">Update College Info</h2>
            <Link to={`/${loggedInCollegeData?.collegeCode}/update-college`}>
              <button className="rounded-md bg-white text-black font-medium text-xl mt-4 px-6 py-4">
                Click here to Update College Details
              </button>
            </Link>
          </div>
        )}

        {logoutModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-200 rounded-lg shadow-md p-6 w-80">
              <div className="text-lg text-black font-semibold text-center mb-4">
                Confirm LogOut?
              </div>
              <div className="flex justify-around">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800"
                >
                  YES
                </button>
                <button
                  onClick={() => setLogoutModal(false)}
                  className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-900"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedNotice && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white w-[800px] h-auto overflow-y-auto rounded-lg shadow-lg border border-gray-200 p-8 relative">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-600 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                onClick={() => setSelectedNotice(null)}
              >
                &times;
              </button>

              {/* Title */}
              <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-3">
                {selectedNotice.headline}
              </h2>

              {/* College Information */}
              <div className="mb-4">
                <p className="text-xl font-semibold text-gray-900 italic">
                  {`Posted by : ${selectedNotice.postedBy}`}
                </p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <p className="text-sm">
                  <strong className="bg-slate-300 py-1 px-2 rounded-xl">
                    Date: {formatDate(selectedNotice.postedAt)}
                  </strong>
                </p>
                <p className="text-sm">
                  <strong className="bg-slate-300 py-1 px-2 rounded-xl">
                    Category: {selectedNotice.category}
                  </strong>
                </p>
              </div>

              {/* Description */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 italic">
                  Description:
                </h3>
                <p className="text-gray-800 bg-slate-300 p-3 rounded-lg">
                  {selectedNotice.description}
                </p>
              </div>

              {/* Attachments */}
              {selectedNotice.attachments &&
                selectedNotice.attachments.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 italic">
                      Attachments:
                    </h3>
                    <ul className="list-disc list-inside">
                      {selectedNotice.attachments.map((attachment, index) => (
                        <li key={index}>
                          <a
                            href={attachment}
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {attachment}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        )}

        {activeSection === "viewImages" && (
          <div className="flex flex-col mx-auto">
            <div className="flex justify-center space-x-4 my-4">
              <button
                onClick={() => setImageActiveSection("gallery")}
                className={`px-4 py-2 rounded-full text-white font-semibold ${
                  imageActiveSection === "gallery"
                    ? "bg-blue-500"
                    : "bg-slate-600"
                }`}
              >
                Gallery
              </button>
              <button
                onClick={() => setImageActiveSection("crousel")}
                className={`px-4 py-2 rounded-full text-white font-semibold ${
                  imageActiveSection === "crousel"
                    ? "bg-blue-500"
                    : "bg-slate-600"
                }`}
              >
                Crousel
              </button>
              <button
                onClick={() => setImageActiveSection("front4")}
                className={`px-4 py-2 rounded-full text-white font-semibold ${
                  imageActiveSection === "front4"
                    ? "bg-blue-500"
                    : "bg-slate-600"
                }`}
              >
                Front4
              </button>
            </div>

            {imageActiveSection === "gallery" && (
              <div className="flex justify-center">
                <div>
                  <h2 className="text-center font-semibold text-4xl text-yellow-300">
                    Gallery Images
                  </h2>
                  <div className="flex flex-wrap gap-6 p-4 justify-center">
                    {loggedInCollegeData.images
                      .slice()
                      .reverse()
                      .map((img) => (
                        <div key={img.url} className="group relative">
                          <img
                            alt={img.name}
                            src={img.url}
                            className="rounded-lg shadow-lg object-cover w-[200px] h-[200px] mb-2"
                          />
                          <p className="text-center text-sm text-gray-600 mb-1">
                            {img.info.slice(1, 10)}
                          </p>
                          <button
                            onClick={() => handleImageDelete("gallery", img)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full opacity-70 hover:opacity-100 transition-opacity z-20"
                          >
                            <RiDeleteBinLine
                              className="text-red-600"
                              size={24}
                            />
                          </button>
                          <p className="absolute inset-0 flex items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300 z-10">
                            {img.name}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {imageActiveSection === "crousel" && (
              <div className="flex justify-center">
                <div>
                  <h2 className="text-center font-semibold text-4xl text-yellow-300">
                    Crousel Images
                  </h2>
                  <div className="flex space-x-4 p-4 justify-center">
                    {loggedInCollegeData.crouselImage
                      .slice()
                      .reverse()
                      .map((img) => (
                        <div key={img} className="flex-shrink-0 group relative">
                          <img
                            alt={img}
                            src={img}
                            className="rounded-lg shadow-lg object-cover w-[200px] h-[200px]"
                          />
                          <button
                            onClick={() => handleImageDelete("crousel", img)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full opacity-70 hover:opacity-100 transition-opacity z-20"
                          >
                            <RiDeleteBinLine
                              className="text-red-600"
                              size={24}
                            />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {imageActiveSection === "front4" && (
              <div className="flex justify-center">
                <div>
                  <h2 className="text-center font-semibold text-4xl text-yellow-300">
                    Front4 Images
                  </h2>
                  <div className="flex space-x-4 p-4 justify-center">
                    {loggedInCollegeData.headImage
                      .slice()
                      .reverse()
                      .map((img) => (
                        <div
                          key={img.url}
                          className="flex-shrink-0 group relative"
                        >
                          <img
                            alt={img.name}
                            src={img.url}
                            className="rounded-lg shadow-lg object-cover w-[200px] h-[200px]"
                          />
                          <button
                            onClick={() => handleImageDelete("front4", img)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full opacity-70 hover:opacity-100 transition-opacity z-20"
                          >
                            <RiDeleteBinLine
                              className="text-red-600"
                              size={24}
                            />
                          </button>
                          <p className="absolute inset-0 flex items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300 z-10">
                            {img.name}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeAdmin;
