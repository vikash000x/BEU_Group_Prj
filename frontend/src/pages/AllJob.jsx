import React, { useContext, useEffect, useState } from 'react';
import FilterCard from '../components/FilterCard';
import LatestJobCards from '../components/LatestJobCards';
import axios from 'axios';
import { StoreContext } from "../context/StoreContext";
import Loader from '../components/loader/Loader';

const AllJob = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });
  const {url} = useContext(StoreContext);
  const categories = ['all', 'location', 'title', 'salary'];

  const fetchJobs = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/job/job-get?page=${page}&limit=12`);
      
      if (res.data.success) {
        setData(res.data.data);
        setPagination(res.data.pagination);
      } else {
        console.error("Failed to fetch jobs:", res.data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      if (selectedCategory === 'all') {
        setFilteredData(data);
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
      setFilteredData([]);
    }
  }, [data, selectedCategory]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchJobs(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-[1400px] mx-auto p-4 md:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-500">Latest</span> Job Openings
          </h1>
          <p className="text-slate-400 mt-2">Find your next opportunity from our curated job listings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-[300px] shrink-0">
            <div className="sticky top-8">
              <FilterCard
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader />
              </div>
            ) : (
              <>
                {/* Job Count */}
                <div className="mb-6">
                  <p className="text-slate-400">
                    Showing {filteredData.length} jobs out of {pagination.totalItems} total
                  </p>
                </div>

                {/* Job Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredData.map((job) => (
                    <LatestJobCards key={job._id} job={job} />
                  ))}
                </div>

                {/* Empty State */}
                {filteredData.length === 0 && (
                  <div className="text-center py-12 bg-slate-800/50 rounded-xl">
                    <p className="text-xl text-slate-400">No jobs found matching your criteria</p>
                    <button 
                      onClick={() => setSelectedCategory('all')}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-2">
                      {[...Array(pagination.totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            pagination.currentPage === index + 1
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-800 hover:bg-slate-700'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJob;
