import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/table';
import { Popover, PopoverContent, PopoverTrigger } from '../components/popover';
import { 
  MoreHorizontal, 
  FileText, 
  Users, 
  Mail, 
  Phone, 
  Calendar,
  Filter,
  Search
} from 'lucide-react';

const applicants = {
  "applications": [
    {
      "_id": "1",
      "applicant": {
        "fullname": "John Doe",
        "email": "johndoe@example.com",
        "phoneNumber": "123-456-7890",
        "profile": {
          "resume": "https://example.com/resumes/john_doe_resume.pdf",
          "resumeOriginalName": "John_Doe_Resume.pdf"
        },
        "createdAt": "2024-11-24T10:45:00Z"
      }
    },
    {
      "_id": "2",
      "applicant": {
        "fullname": "Jane Smith",
        "email": "janesmith@example.com",
        "phoneNumber": "987-654-3210",
        "profile": {
          "resume": null,
          "resumeOriginalName": null
        },
        "createdAt": "2024-11-23T14:30:00Z"
      }
    },
    {
      "_id": "3",
      "applicant": {
        "fullname": "Jane Smith",
        "email": "janesmith@example.com",
        "phoneNumber": "987-654-3210",
        "profile": {
          "resume": null,
          "resumeOriginalName": null
        },
        "createdAt": "2024-11-23T14:30:00Z"
      }
    },
    {
      "_id": "4",
      "applicant": {
        "fullname": "Jane Smith",
        "email": "janesmith@example.com",
        "phoneNumber": "987-654-3210",
        "profile": {
          "resume": null,
          "resumeOriginalName": null
        },
        "createdAt": "2024-11-23T14:30:00Z"
      }
    },
    {
      "_id": "5",
      "applicant": {
        "fullname": "Jane Smith",
        "email": "janesmith@example.com",
        "phoneNumber": "987-654-3210",
        "profile": {
          "resume": null,
          "resumeOriginalName": null
        },
        "createdAt": "2024-11-23T14:30:00Z"
      }
    },
    {
      "_id": "6",
      "applicant": {
        "fullname": "Jane Smith",
        "email": "janesmith@example.com",
        "phoneNumber": "987-654-3210",
        "profile": {
          "resume": null,
          "resumeOriginalName": null
        },
        "createdAt": "2024-11-23T14:30:00Z"
      }
    }
  ]
};

const shortlistingStatus = ["Shortlisted", "Under Review", "Rejected"];

const AppliedList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const filteredApplicants = applicants.applications.filter(item => 
    item.applicant.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.2,
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          <h1 
            className="
              text-4xl 
              font-extrabold 
              text-transparent 
              bg-clip-text 
              bg-gradient-to-r 
              from-blue-400 
              to-purple-600
              text-center
              tracking-tight
              mb-4
            "
          >
            Applied Student List
          </h1>
          <p 
            className="
              text-lg 
              text-gray-300 
              text-center 
              max-w-2xl 
              mx-auto 
              mb-6
            "
          >
            Discover talented candidates who have applied for your job openings.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4"
        >
          <div className="relative w-full md:w-2/3 lg:w-1/2">
            <input 
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full 
                pl-10 
                pr-4 
                py-2 
                rounded-xl 
                bg-slate-800 
                border 
                border-slate-700 
                text-white 
                focus:ring-2 
                focus:ring-blue-500
                transition-all
                duration-300
              "
            />
            <Search 
              className="
                absolute 
                left-3 
                top-1/2 
                transform 
                -translate-y-1/2 
                text-gray-400
              " 
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="
              w-full 
              md:w-auto 
              px-4 
              py-2 
              rounded-xl 
              bg-slate-800 
              border 
              border-slate-700 
              text-white 
              focus:ring-2 
              focus:ring-blue-500
            "
          >
            <option value="">All Statuses</option>
            {shortlistingStatus.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </motion.div>

        {/* Table Section */}
        <motion.div 
          className="bg-slate-800/60 backdrop-blur-lg shadow-2xl rounded-2xl overflow-x-auto border border-slate-700/50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Table className="w-full">
            <TableHeader className="bg-slate-700 text-white">
              <TableRow>
                <TableHead className="px-4 py-3 text-left">Full Name</TableHead>
                <TableHead className="px-4 py-3 text-left">Email</TableHead>
                <TableHead className="px-4 py-3 text-left hidden md:table-cell">Contact</TableHead>
                <TableHead className="px-4 py-3 text-left hidden lg:table-cell">Resume</TableHead>
                <TableHead className="px-4 py-3 text-left hidden md:table-cell">Date</TableHead>
                <TableHead className="px-4 py-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                    No applicants found
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplicants.map((item) => (
                  <motion.tr 
                    key={item._id}
                    variants={itemVariants}
                    className="
                      bg-slate-900/50 
                      text-gray-200 
                      hover:bg-slate-700/50 
                      transition-all 
                      duration-300 
                      border-b 
                      border-slate-700
                    "
                  >
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-400 mr-2 hidden md:inline-block" />
                        {item?.applicant?.fullname}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-green-400 mr-2 hidden md:inline-block" />
                        {item?.applicant?.email}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-purple-400 mr-2" />
                        {item?.applicant?.phoneNumber}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 hidden lg:table-cell">
                      {item.applicant?.profile?.resume ? (
                        <a 
                          href={item?.applicant?.profile?.resume} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="
                            text-blue-400 
                            hover:text-blue-300 
                            flex 
                            items-center
                          "
                        >
                          <FileText className="w-5 h-5 mr-2" />
                          {item?.applicant?.profile?.resumeOriginalName}
                        </a>
                      ) : (
                        <span className="text-gray-500">No Resume</span>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-red-400 mr-2" />
                        {item?.applicant.createdAt.split("T")[0]}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <Popover>
                        <PopoverTrigger>
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="
                              cursor-pointer 
                              text-gray-400 
                              hover:text-white 
                              inline-flex 
                              items-center 
                              justify-center
                            "
                          >
                            <MoreHorizontal />
                          </motion.div>
                        </PopoverTrigger>
                        <PopoverContent 
                          className="
                            bg-slate-800 
                            text-white 
                            w-48 
                            border 
                            border-slate-700 
                            rounded-xl 
                            shadow-2xl
                            z-50
                          "
                        >
                          {shortlistingStatus.map((status, index) => (
                            <motion.div 
                              key={index}
                              whileHover={{ x: 10 }}
                              className="
                                flex 
                                items-center 
                                my-1 
                                px-3 
                                py-2 
                                cursor-pointer 
                                hover:bg-slate-700 
                                rounded-lg 
                                transition-all 
                                duration-300
                              "
                            >
                              <span>{status}</span>
                            </motion.div>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
};

export default AppliedList;