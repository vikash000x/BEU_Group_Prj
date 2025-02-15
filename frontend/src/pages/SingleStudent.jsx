import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import {
  Mail,
  Phone,
  Building,
  Star,
  BookOpen,
  Clock,
  ArrowLeft,
  Award,
} from "lucide-react";
import { toast } from "react-toastify";

const SingleStudent = () => {
  const { url } = useContext(StoreContext);
  const [singleFacultyData, setSingleFacultyData] = useState(null);
  // const [loading, setLoading] = useState(true);
  const { student_id } = useParams();
  const navigate = useNavigate();

  const fetchSingleFaculty = async () => {
    try {
      // setLoading(true);
      const res = await axios.get(
        `${url}/student/get-single-student/${student_id}`
      );
      if (res?.data?.success) {
        setSingleFacultyData(res?.data?.student);
        // setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to fetch faculty details");
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleFaculty();
  }, [student_id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center">
  //       <motion.div
  //         animate={{ rotate: 360 }}
  //         transition={{
  //           duration: 1,
  //           repeat: Infinity,
  //           ease: "linear",
  //         }}
  //         className="w-16 h-16 border-4 border-t-blue-500 border-r-purple-500 border-b-green-500 border-l-red-500 rounded-full"
  //       />
  //     </div>
  //   );
  // }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="
          absolute 
          top-6 
          left-6 
          bg-slate-700 
          text-white 
          p-2 
          rounded-full 
          shadow-lg 
          hover:bg-slate-600 
          transition-all 
          duration-300
        "
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-slate-700/50 flex flex-col md:flex-row"
      >
        <motion.div variants={itemVariants} className="md:w-1/3 relative">
          <motion.img
            src={
              singleFacultyData?.profileImage ||
              "https://tse1.mm.bing.net/th?id=OIP.5r2gNBXIlFTH4Azt4AdnLgHaLA&pid=Api&P=0&h=180"
            }
            alt={singleFacultyData?.name}
            className="
              w-full 
              h-full 
              object-cover 
              transition-transform 
              duration-300 
              hover:scale-105
            "
            whileHover={{ scale: 1.05 }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="
              absolute 
              bottom-0 
              left-0 
              right-0 
              bg-black 
              bg-opacity-50 
              text-white 
              p-4 
              text-center
            "
          >
            <h2 className="text-2xl font-bold">{singleFacultyData?.name}</h2>
            <p className="text-sm text-gray-300">
              {singleFacultyData?.designation}
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="md:w-2/3 p-8 space-y-6">
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="bg-slate-700 p-4 rounded-xl shadow-lg flex items-center gap-4"
            >
              <BookOpen className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-sm text-gray-400">Branch</h3>
                <p className="text-white font-semibold">
                  {singleFacultyData?.branch}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-slate-700 p-4 rounded-xl shadow-lg flex items-center gap-4"
            >
              <Clock className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-sm text-gray-400">Registration No.</h3>
                <p className="text-white font-semibold">
                  {singleFacultyData?.regNo}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-slate-700 p-4 rounded-xl shadow-lg flex items-center gap-4"
            >
              <Star className="w-8 h-8 text-yellow-400" />
              <div>
                <h3 className="text-sm text-gray-400">Year</h3>
                <p className="text-white font-semibold">
                  {singleFacultyData?.year}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-slate-700 p-4 rounded-xl shadow-lg flex items-center gap-4"
            >
              <Award className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-sm text-gray-400">cgpa</h3>
                <p className="text-white font-semibold">
                  {singleFacultyData?.cgpa}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 bg-slate-700 p-4 rounded-xl shadow-lg"
            >
              <Mail className="w-6 h-6 text-red-400" />
              <div>
                <h3 className="text-sm text-gray-400">Email</h3>
                <p className="text-white font-semibold">
                  {singleFacultyData?.email}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 bg-slate-700 p-4 rounded-xl shadow-lg"
            >
              <Phone className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="text-sm text-gray-400">Phone</h3>
                <p className="text-white font-semibold">
                  {singleFacultyData?.phone}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 bg-slate-700 p-4 rounded-xl shadow-lg"
            >
              <Building className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="text-sm text-gray-400">Office</h3>
                <p className="text-white font-semibold">
                  {singleFacultyData?.office}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SingleStudent;
