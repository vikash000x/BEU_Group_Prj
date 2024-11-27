import React, { useEffect, useState } from 'react';
import LatestJobs from '../components/LatestJobs';
import FilterCard from '../components/FilterCard';
import { allJobs } from '../lib/utils';
import LatestJobCards from '../components/LatestJobCards';

const AllJob = () => {
  const [data, setData] = useState([]); // All jobs
  const [filteredData, setFilteredData] = useState([]); // Filtered jobs
  const [selectedCategory, setSelectedCategory] = useState('all'); // Active filter
  const [loading, setLoading] = useState(false); // Loading state

  const categories = ['all', 'location', 'title', 'salary']; // Define filter options

  // Show loader and filter jobs when `selectedCategory` changes
  useEffect(() => {
    setLoading(true); // Show loader
    const timer = setTimeout(() => {
      if (selectedCategory === 'all') {
        setFilteredData(allJobs); // Show all jobs
      } else {
        setFilteredData(
          allJobs.filter(
            (item) =>
              item.location === selectedCategory ||
              item.salary === selectedCategory ||
              item.title === selectedCategory
          )
        );
      }
      setLoading(false); // Hide loader after 500 ms
    }, 300);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [selectedCategory]);

  return (
    <div className="w-[1300px] my-3 mx-auto flex">
      {/* Filter Sidebar */}
      <div className="w-[20%] mt-[76px]">
        <FilterCard
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Main Job Listings */}
      <div className="max-w-9xl mx-auto my-20">
        <h1 className="text-4xl font-bold">
          <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
        </h1>

        <div className="grid grid-cols-3 gap-4 my-5">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-600 border-b-4 border-gray-200"></div>
            </div>
          ) : filteredData.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            filteredData.map((job) => <LatestJobCards key={job.id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJob;
