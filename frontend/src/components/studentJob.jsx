import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import {  useNavigate } from "react-router-dom";

const JobsSection = () => {
  const [selectedTab, setSelectedTab] = useState("applied"); // Default tab is "applied"
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const studentId = JSON.parse(localStorage.getItem("loggedInStudentData"))?._id;
  const token = localStorage.getItem("token");

   const {url} = useContext(StoreContext);

   const navigate = useNavigate();

   const handledev = () =>{
    console.log("clicked");
   }


   const handlenav = (id) => {
    navigate(`/description/${id}`);

    console.log("id", id);
   };

  useEffect(() => {
    if (studentId) {
      fetchJobs();
    }
  }, [studentId]);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${url}/student/${studentId}/apply-save`, {
        method: 'GET', // Explicitly specify GET method
        headers: {
          'Content-Type': 'application/json', // Ensure you're dealing with JSON
          // Optionally add Authorization if needed, like token
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log(data);
      setAppliedJobs(data.appliedJobs);
      setSavedJobs(data.savedJobs);

      localStorage.setItem('appliedJobs', JSON.stringify(data.appliedJobs));
    localStorage.setItem('savedJobs', JSON.stringify(data.savedJobs));
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
      // Optionally handle state for error, e.g., set an error state
      // setErrorMessage("An error occurred while fetching the jobs.");
    }
  };
  

  

 console.log("applying",  appliedJobs);
  console.log( "saving", savedJobs);

  return (
    <div className="mx-40 my-10 text-white shadow-xl bg-slate-800 border border-gray-100 cursor-pointer rounded-2xl p-5">
      {/* Toggle Buttons */}
      <div className="flex justify-around">
        <button
          onClick={() => setSelectedTab("applied")}
          className={`px-4 py-2 rounded-lg ${
            selectedTab === "applied" ? "bg-blue-500" : "bg-gray-600"
          }`}
        >
          Applied Jobs
        </button>
        <button
          onClick={() => setSelectedTab("saved")}
          className={`px-4 py-2 rounded-lg ${
            selectedTab === "saved" ? "bg-blue-500" : "bg-gray-600"
          }`}
        >
          Saved Jobs
        </button>
      </div>

      {/* Render Job Cards */}
      <div className="mt-5">
        {selectedTab === "applied" ? (
          appliedJobs?.length > 0 ? (

           
            appliedJobs?.map((job) => (
              <div onClick={() => navigate(`/description/${job?._id}`)} >
              <JobCard key={job._id} job={job}  
              />
              </div>
           
            ))   
          ) : (
            <p>No applied jobs found.</p>
          )
        ) : savedJobs?.length > 0 ? (
          savedJobs?.map((job) => (
            <div onClick={() => navigate(`/description/${job?._id}`)} >

              <JobCard key={job._id} job={job}  />   
            </div>
          ))
        ) : (
          <p>No saved jobs found.</p>
        )}
      </div>
    </div>
  );
};

// Job Card Component
const JobCard = ({ job }) => {
  return (
    <div className="p-4 bg-gray-700 rounded-lg my-2">
      <h2 className="font-bold text-lg  ">{job.title}</h2>
      <p>{job.description}</p>
      <p className="text-sm text-gray-400">Location: {job.location}</p>
    </div>
  );
};

export default JobsSection;
