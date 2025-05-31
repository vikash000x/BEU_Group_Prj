import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from '../components/loader/Loader';
import { toast } from "react-toastify";

const StudentActivity = ({ collegeCode }) => {
  const { url, loading, setLoading } = useContext(StoreContext);
  const navigate = useNavigate();

  const loggedInStudentData = localStorage.getItem("loggedInStudentData");

    const parsedData = JSON.parse(loggedInStudentData);
    
     const studentId = parsedData.studentProfileId._id; 
     console.log(studentId);
 

  const [cards, setCards] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    thumbnail: "",
    title: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    const externalLinks = parsedData.studentProfileId.externalLinks || [];
    setCards(externalLinks);
  }, [loggedInStudentData]);


  // Fetch the initial data for the student's external links
  
  const handleAddCard = async () => {
   

    try {
      setLoading(true);
        const response = await axios.post(
            `${url}/student/update-external-links/${studentId}`,
            formData, // Pass the new card data directly
            { headers: { "Content-Type": "application/json" } }
        );
       
                        toast.success("your activity created successfully!");
                        setLoading(false);
                        
                    
        const updatedCards = [...cards, { ...formData, id: Date.now() }];
        setCards(updatedCards);
        setFormData({ thumbnail: "", title: "", description: "", link: "" });
        setIsModalOpen(false);

        // Update localStorage with the latest externalLinks data
        const loggedInStudentData = JSON.parse(localStorage.getItem("loggedInStudentData"));
        loggedInStudentData.studentProfileId.externalLinks = response.data.externalLinks; // Update localStorage
        localStorage.setItem("loggedInStudentData", JSON.stringify(loggedInStudentData));

        setCards(response.data.externalLinks); // Sync state with the updated database data
    } catch (error) {
      setLoading(false);
        console.error("Error fetching external links:", error);
    }
};

 //setCards([...cards, parsedData.studentProfileId.externalLinks] );

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle deleting a card
  const handleDeleteCard = async (linkId) => {

    try {
      // Make a DELETE request to the backend
      const response = await axios.delete(
        `${url}/student/delete-external-links/${studentId}/${linkId}`
      );
  
      // Update the local state with the latest externalLinks
      const updatedCards = response.data.externalLinks;
      setCards(updatedCards);
  
      // Update localStorage
      const loggedInStudentData = JSON.parse(localStorage.getItem("loggedInStudentData"));
      loggedInStudentData.studentProfileId.externalLinks = updatedCards;
      localStorage.setItem("loggedInStudentData", JSON.stringify(loggedInStudentData));
  
      console.log("Card deleted successfully!");
    } catch (error) {
      console.error("Error deleting external link:", error);
    }
  };

  return (
    loading ? (
      <Loader />
    ) : (
      <div className="w-[815px] text-white shadow-xl bg-slate-800">
        <div className="flex justify-end p-4">
          <button
            onClick={() => navigate(`/study-materials`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Study Materials
          </button>
        </div>
    <div className="flex justify-between items-center mb-3">
      <h1 className="text-2xl font-bold text-[#eff369] pr-3 ">Activities</h1>
      <button
        className="p-1  text-white border-2 border-white  rounded-md ml-[750px] "
        onClick={() => setIsModalOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 w-[900px]">
      {cards.map((card) => (
        <div
          key={card.id}
          className=" text-white rounded-md  group  bg-slate-800 border border-gray-100 cursor-pointer transform transition-transform duration-200 hover:scale-100 shadow-md overflow-hidden relative"
        >
          
          <a href={card.link} target="_blank" rel="noopener noreferrer">
            <img
              src={card.thumbnail}
              alt="Thumbnail"
              className="w-full h-32 object-cover"
            />
            <div className="absolute text-center inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-white text-2xl font-bold">{card.title}</p>
    </div>
          </a>
          <div className="p-4">
            <h2 className="font-semibold text-lg truncate">{card.link}</h2>
            <p className="text-sm text-gray-500 truncate">{card.description}</p>
          </div>
          <button
            className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-400 text-black"
            onClick={() => handleDeleteCard(card._id) }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>

    {isModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="text-white bg-slate-800  cursor-pointer  p-6 rounded-lg shadow-lg w-96 border-2 border-white">
                <h2 className="text-xl font-bold mb-4">Add New Card</h2>
    
                <label className="block mb-2">Thumbnail URL:</label>
                <input
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className=" text-black w-full p-2 border rounded-md mb-4"
                  placeholder="Enter thumbnail URL"
                />
    
                <label className="block mb-2">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="text-black w-full p-2 border rounded-md mb-4"
                  placeholder="Enter title"
                />
    
                <label className="block mb-2">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="text-black w-full p-2 border rounded-md mb-4"
                  placeholder="Enter description"
                />
    
                <label className="block mb-2">Link:</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="text-black w-full p-2 border rounded-md mb-4"
                  placeholder="Enter link"
                />
    
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-yellow-300 mr-2 hover:text-gray-600"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-yellow-300 hover:text-gray-600"
                    onClick={handleAddCard}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
    )
  );
};

export default StudentActivity;