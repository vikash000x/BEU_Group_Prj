import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
import { Popover, PopoverContent, PopoverTrigger } from "../components/popover";
import { Edit2, Eye, MoreHorizontal, Filter, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/input";
import axios from "axios";

const JobSection = () => {
  const [job, setJob] = useState([]); 
  const [filteredJobs, setFilteredJobs] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortConfig, setSortConfig] = useState({ 
    key: 'createdAt', 
    direction: 'descending' 
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/job/job-get", {
          withCredentials: true,
        });
        if (res.status === 200) {
          const sortedJobs = res.data.data.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setJob(sortedJobs);
          setFilteredJobs(sortedJobs);
        } else {
          console.error("Failed to fetch jobs:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllAdminJobs();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = job.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setFilteredJobs(sortedJobs);
  };

  const getJobTypeColor = (jobType) => {
    switch(jobType) {
      case 'Full Time': return 'bg-blue-900/20 text-blue-400';
      case 'Part Time': return 'bg-purple-900/20 text-purple-400';
      case 'Internship': return 'bg-green-900/20 text-green-400';
      default: return 'bg-gray-900/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="
              text-3xl 
              font-bold 
              text-transparent 
              bg-clip-text 
              bg-gradient-to-r 
              from-blue-400 
              to-purple-600
              mb-2
            ">
              Job Management Dashboard
            </h1>
            <p className="text-gray-400">
              Manage and track your job postings efficiently
            </p>
          </div>
          <button
            onClick={() => navigate("/job-section/Job-creation")}
            className="
              px-6 
              py-2 
              bg-gradient-to-r 
              from-blue-600 
              to-purple-700 
              text-white 
              rounded-lg 
              hover:from-blue-700 
              hover:to-purple-800 
              transition-all 
              duration-300 
              transform 
              hover:-translate-y-1 
              shadow-lg 
              hover:shadow-xl
            "
          >
            Post New Job
          </button>
        </div>

        <div className="bg-slate-800 shadow-2xl rounded-xl overflow-hidden border border-slate-700">
          <div className="p-6 bg-slate-900/50 border-b border-slate-700 flex items-center justify-between">
            <div className="relative flex-grow mr-4">
              <Input
                className="
                  w-full 
                  pl-10 
                  pr-4 
                  py-2 
                  rounded-lg 
                  border 
                  border-slate-700 
                  bg-slate-800 
                  text-gray-300 
                  focus:ring-2 
                  focus:ring-blue-500
                "
                placeholder="Search jobs by title"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Search 
                className="
                  absolute 
                  left-3 
                  top-1/2 
                  transform 
                  -translate-y-1/2 
                  text-gray-500
                " 
              />
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Filter className="text-gray-500" />
              <span>Filters</span>
            </div>
          </div>

          <Table>
            <TableHeader className="bg-slate-800 text-gray-400 border-b border-slate-700">
              <TableRow>
                <TableHead 
                  onClick={() => handleSort('title')}
                  className="
                    cursor-pointer 
                    hover:bg-slate-700 
                    transition-colors 
                    duration-300
                  "
                >
                  Role 
                  {sortConfig.key === 'title' && (
                    <span className="ml-2">
                      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                    </span>
                  )}
                </TableHead>
                <TableHead 
                  onClick={() => handleSort('createdAt')}
                  className="
                    cursor-pointer 
                    hover:bg-slate-700 
                    transition-colors 
                    duration-300
                  "
                >
                  Date
                  {sortConfig.key === 'createdAt' && (
                    <span className="ml-2">
                      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                    </span>
                  )}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((item, index) => (
                  <TableRow 
                    key={index} 
                    className="
                      hover:bg-slate-700/50 
                      transition-colors 
                      duration-300 
                      group
                      border-b 
                      border-slate-700
                    "
                  >
                    <TableCell>
                      <div className="flex items-center">
                        <span className={`
                          px-2 
                          py-1 
                          rounded-full 
                          text-xs 
                          font-medium 
                          mr-3
                          ${getJobTypeColor(item.jobType)}
                        `}>
                          {item.jobType || 'Unspecified'}
                        </span>
                        <span className="text-gray-300 group-hover:text-white transition-colors">
                          {item.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal 
                            className="
                              text-gray-500 
                              hover:text-blue-400 
                              transition-colors 
                              duration-300
                            " 
                          />
                        </PopoverTrigger>
                        <PopoverContent 
                          className="
                            bg-slate-800 
                            shadow-xl 
                            border 
                            border-slate-700 
                            rounded-lg
                            text-gray-300
                          "
                        >
                          <div
                            className="
                              flex 
                              items-center 
                              gap-2 
                              p-2 
                              hover:bg-slate-700 
                              rounded 
                              cursor-pointer
                              transition-colors
                              duration-300
                            "
                            onClick={() =>
                              navigate(`/job-section/update-job/${item._id}`)
                            }
                          >
                            <Edit2 className="w-4 text-blue-400" />
                            <span>Edit</span>
                          </div>
                          <div
                            className="
                              flex 
                              items-center 
                              gap-2 
                              p-2 
                              hover:bg-slate-700 
                              rounded 
                              cursor-pointer
                              transition-colors
                              duration-300
                            "
                            onClick={() => navigate("/job-section/applied-list")}
                          >
                            <Eye className="w-4 text-green-400" />
                            <span>Applicants</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3" className="text-center text-gray-500 py-8">
                    No jobs found. Create your first job posting!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default JobSection;
