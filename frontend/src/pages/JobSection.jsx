import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
//import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from "../components/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
//import { useNavigate } from 'react-router-dom';
//import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { Input } from "../components/input";
import axios from "axios";

const JobSection = () => {
  const [job, setJob] = useState([]); // Use an empty array for storing jobs
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/job/job-get", {
          withCredentials: true,
        });
        console.log(res);
        if (res.status === 200) {
          setJob(res.data.data); // Update the state with jobs
        } else {
          console.error("Failed to fetch jobs:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllAdminJobs();
  }, []); // Run only once when the component mounts

  return (
    <div className="w-[1200px] my-3 mx-auto">
      <div className="flex items-center justify-between my-5 mx-5">
        <Input className="w-fit" placeholder="Filter by name, role" />
        {/* <Button className="border border-gray-500">New Jobs</Button>
          
          */}
        <button
          className="px-6 py-2 h-10 text-white bg-[#0B192C] border-[0.01rem] rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out 
     sm:px-8px  lg:h-11 lg:rounded-md lg:px-8 sm:h-9 sm:rounded-md sm:px-3   md:px-8 md:py-[-10px] text-sm "
          onClick={() => navigate("/job-section/Job-creation")}
        >
          Job
        </button>
      </div>

      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader className="bg-gray-500 text-white">
          <TableRow>
            {/* <TableHead>Company Name</TableHead> */}
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="space-y-4">
          {job.length > 0 ? (
            job
              .slice()
              .reverse()
              .map((item, index) => (
                // Use slice() to avoid mutating the original array
                <tr
                  key={index} // Add a unique key here
                  className="hover:border-red-400 py-4 bg-slate-800 text-white border-b border-white rounded-lg"
                >
                  {/* <TableCell>{job?.company?.name}</TableCell> */}
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.createdAt.split("T")[0]}</TableCell>{" "}
                  {/* Format date */}
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 bg-slate-400 hover:bg-violet-200">
                        <div
                          className="flex items-center gap-2 w-fit cursor-pointer"
                          onClick={() =>
                            navigate(`/job-section/update-job/${item._id}`)
                          }
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                          onClick={() => navigate("/job-section/applied-list")}
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="3">No jobs available</td>
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobSection;
