import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Trash2,
  Edit,
  Search,
  Filter,
  User,
  BookOpen,
  Award,
} from "lucide-react";
import { toast } from "react-toastify";
import UpdateFacultyForm from "../components/UpdateFacultyForm";

const FacultiesList = () => {
  const { collegeCode } = useParams();
  const navigate = useNavigate();
  const { url, userType, token, loggedInCollegeData } =
    useContext(StoreContext);
  const [collegeFacultyData, setCollegeFacultyData] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredFaculties, setFilteredFaculties] = useState(null);
  const [actionModal, setActionModal] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const departments = [
    "Computer Science",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Electronics and Communication",
    "Information Technology",
    "Biotechnology",
    "Aerospace Engineering",
    "Chemical Engineering",
    "Data Science",
  ];

  const handleSearch = () => {
    let searchData = collegeFacultyData;

    if (search) {
      searchData = searchData.filter((faculty) =>
        faculty.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDepartment) {
      searchData = searchData.filter(
        (faculty) => faculty.department === selectedDepartment
      );
    }

    setFilteredFaculties(searchData);
    setSearch("");
  };

  const fetchFacultyData = async () => {
    try {
      const res = await axios.get(
        `${url}/student/get-student-data/${collegeCode}`
      );
      console.log("responese from studentlist", res);
      if (res?.data?.success) {
        setCollegeFacultyData(res?.data?.studentData);
        setFilteredFaculties(res?.data?.studentData);
      }
    } catch (error) {
      toast.error("Failed to fetch faculty data");
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const handleEditFaculty = async (faculty) => {
    setActionModal(faculty);
  };

  const handleDeleteFaculty = async (faculty) => {
    toast.success("Faculty deleted successfully");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="max-w-7xl mx-auto mb-10"
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
          Faculty Directory
        </h1>
        <p
          className="
            text-lg 
            text-gray-300 
            text-center 
            max-w-2xl 
            mx-auto 
            mb-8
          "
        >
          Explore the talented educators who drive academic excellence and
          innovation.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4"
      >
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search faculty by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full 
              pl-10 
              pr-4 
              py-3 
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

        <div className="relative w-full md:w-1/2">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="
              w-full 
              pl-10 
              pr-4 
              py-3 
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
          >
            <option value="">All Departments</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <Filter
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

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="
            w-full 
            md:w-auto 
            px-6 
            py-3 
            bg-gradient-to-r 
            from-blue-600 
            to-purple-700 
            text-white 
            rounded-xl 
            hover:from-blue-700 
            hover:to-purple-800 
            transition-all 
            duration-300 
            shadow-xl
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <Search className="w-5 h-5" />
          Search
        </motion.button>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto bg-slate-800/60 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-slate-700/50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <table className="w-full">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" />
                Profile
              </th>
              <th className="px-4 py-3 text-left">
                <BookOpen className="w-5 h-5 text-green-400 inline-block mr-2" />
                Name
              </th>
              <th className="px-4 py-3 text-left hidden md:table-cell">
                <Award className="w-5 h-5 text-purple-400 inline-block mr-2" />
                Department
              </th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">
                Designation
              </th>
              {userType === "college" &&
                loggedInCollegeData.collegeCode ===
                  localStorage.getItem("collegeCode") &&
                token && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredFaculties && filteredFaculties.length > 0 ? (
                filteredFaculties.map((faculty) => (
                  <motion.tr
                    key={faculty._id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="
                      bg-slate-900/50 
                      text-gray-200 
                      hover:bg-slate-700/50 
                      transition-all 
                      duration-300 
                      border-b 
                      border-slate-700
                      cursor-pointer
                    "
                    onClick={() => navigate(`/college/student/${faculty._id}`)}
                  >
                    <td className="px-4 py-3">
                      <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt={faculty?.name}
                        className="
                          w-16 
                          h-16 
                          rounded-full 
                          object-cover 
                          border-2 
                          border-blue-500
                          transition-transform
                          duration-300
                          hover:scale-110
                        "
                      />
                    </td>
                    <td className="px-4 py-3">{faculty.name}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {faculty.branch}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {faculty.regNo}
                    </td>
                    {userType === "college" &&
                      loggedInCollegeData.collegeCode ===
                        localStorage.getItem("collegeCode") &&
                      token && (
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditFaculty(faculty);
                              }}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Edit className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFaculty(faculty);
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </td>
                      )}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-8">
                    No faculty members found
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>

      <AnimatePresence>
        {actionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[80vh] w-full max-w-3xl mx-auto overflow-auto bg-slate-800 rounded-lg shadow-2xl"
            >
              <UpdateFacultyForm
                facultyDataToUpdate={actionModal}
                setActionModal={setActionModal}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FacultiesList;
