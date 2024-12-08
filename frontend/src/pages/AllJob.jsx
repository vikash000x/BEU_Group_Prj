import React, { useEffect, useState } from 'react';
import FilterCard from '../components/FilterCard';
import LatestJobCards from '../components/LatestJobCards';
import axios from 'axios';

const AllJob = () => {
  const [data, setData] = useState([]); // All jobs
  const [filteredData, setFilteredData] = useState([]); // Filtered jobs
  const [selectedCategory, setSelectedCategory] = useState('all'); // Active filter
  const [loading, setLoading] = useState(false); // Loading state

  const categories = ['all', 'location', 'title', 'salary']; // Define filter options

   // Fetch jobs from the API
   useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/job/job-get', { withCredentials: true });
    ///    console.log(res);
        if (res.status === 200) {
          setData(res.data.data); // Update the state with jobs
        } else {
          console.error("Failed to fetch jobs:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllAdminJobs();
  }, []);

  // Show loader and filter jobs when `selectedCategory` changes
  useEffect(() => {
    setLoading(true); // Show loader
    const timer = setTimeout(() => {
      if (data.length > 0) { // Ensure data is fetched before filtering
        if (selectedCategory === 'all') {
          setFilteredData(data); // Show all jobs
        } else {
          setFilteredData(
            data.filter(
              (item) =>
                item.location === selectedCategory ||
                item.salary === selectedCategory ||
                item.title === selectedCategory
            )
          );
        }
      } else {
        setFilteredData([]); // Clear data if no jobs available
      }
      setLoading(false); // Hide loader after filtering
    }, 300);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [selectedCategory, data]); // Run filtering logic when either `selectedCategory` or `data` changes
 console.log(filteredData);

  return (
    <div className="w-[1300px] my-3  mx-auto flex">
      {/* Filter Sidebar */}
      <div className="w-[15%] mt-10">
        <FilterCard
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Main Job Listings */}
      <div className="max-w-9xl mx-auto ">
        <h1 className="flex justify-center text-white text-4xl font-bold">
          <span className=" text-[#eff369] pr-3 ">Latest & Top </span> Job Openings
        </h1>

        <div className="grid grid-cols-3 gap-4 my-5">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-600 border-b-4 border-gray-200"></div>
            </div>
          ) : filteredData.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            filteredData.map((job) => <LatestJobCards key={job._id} job={job} />  )
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJob;
