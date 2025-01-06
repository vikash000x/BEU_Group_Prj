import React, { useState } from "react";
import { toast } from "react-toastify";
import { Label } from "../components/label";
import { Input } from "../components/input";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  FileText, 
  Star, 
  Users, 
  Send 
} from "lucide-react";
import Loader from "../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const { loading, setLoading, token } = useContext(StoreContext);
  const {url} = useContext(StoreContext);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${url}/job/job-post`,
        input,
        {
          headers: { token }
        }
      );

      if (res.data.success) {
        toast.success("Job created successfully!");
        navigate("/job-section");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to create job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      } 
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.2,
        staggerChildren: 0.1 
      }
    }
  };

  const jobTypeOptions = [
    "Full Time", 
    "Part Time", 
    "Contract", 
    "Freelance", 
    "Internship"
  ];

  const experienceLevels = [
    "Entry Level", 
    "Mid Level", 
    "Senior Level", 
    "Executive"
  ];

  return loading ? (
    <Loader />
  ) : (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 10 
        }}
        className="w-full max-w-4xl bg-slate-800/60 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-slate-700/50 p-8"
      >
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="
            text-4xl 
            font-extrabold 
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-blue-400 
            to-purple-600
            mb-6
            text-center
            tracking-tight
          "
        >
          Create New Job Posting
        </motion.h1>

        <form onSubmit={submitHandler}>
          <motion.div 
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={inputVariants}>
              <Label className="flex items-center gap-2 mb-2 text-white">
                <Briefcase className="w-5 h-5 text-blue-400" />
                Job Title
              </Label>
              <Input
                required
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="e.g. Senior Software Engineer"
                className="
                  w-full 
                  px-4 
                  py-3 
                  rounded-xl 
                  border 
                  border-slate-700 
                  bg-slate-900/50 
                  text-gray-200 
                  focus:ring-2 
                  focus:ring-blue-500
                  transition-all
                  duration-300
                "
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <Label className="flex items-center gap-2 mb-2 text-white">
                <FileText className="w-5 h-5 text-green-400" />
                Description
              </Label>
              <textarea
                required
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Provide a detailed job description"
                className="
                  w-full 
                  px-4 
                  py-3 
                  rounded-xl 
                  border 
                  border-slate-700 
                  bg-slate-900/50 
                  text-gray-200 
                  focus:ring-2 
                  focus:ring-blue-500
                  transition-all
                  duration-300
                  min-h-[120px]
                "
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <Label className="flex items-center gap-2 mb-2 text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                Requirements
              </Label>
              <textarea
                required
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="List key job requirements"
                className="
                  w-full 
                  px-4 
                  py-3 
                  rounded-xl 
                  border 
                  border-slate-700 
                  bg-slate-900/50 
                  text-gray-200 
                  focus:ring-2 
                  focus:ring-blue-500
                  transition-all
                  duration-300
                  min-h-[120px]
                "
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <Label className="flex items-center gap-2 mb-2 text-white">
                <DollarSign className="w-5 h-5 text-green-500" />
                Salary Range
              </Label>
              <Input
                required
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="e.g. $80,000 - $120,000"
                className="
                  w-full 
                  px-4 
                  py-3 
                  rounded-xl 
                  border 
                  border-slate-700 
                  bg-slate-900/50 
                  text-gray-200 
                  focus:ring-2 
                  focus:ring-blue-500
                  transition-all
                  duration-300
                "
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <Label className="flex items-center gap-2 mb-2 text-white">
                <MapPin className="w-5 h-5 text-red-400" />
                Location
              </Label>
              <Input
                required
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="City, State, Country"
                className="
                  w-full 
                  px-4 
                  py-3 
                  rounded-xl 
                  border 
                  border-slate-700 
                  bg-slate-900/50 
                  text-gray-200 
                  focus:ring-2 
                  focus:ring-blue-500
                  transition-all
                  duration-300
                "
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <Label className="flex items-center gap-2 mb-2 text-white">
                <Briefcase className="w-5 h-5 text-purple-400" />
                Job Type
              </Label>
              <select
                required
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="
                  w-full 
                  px-4 
                  py-3 
                  rounded-xl 
                  border 
                  border-slate-700 
                  bg-slate-900/50 
                  text-gray-200 
                  focus:ring-2 
                  focus:ring-blue-500
                  transition-all
                  duration-300
                "
              >
                <option value="">Select Job Type</option>
                {jobTypeOptions.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={inputVariants}>
              <Label className="flex items-center gap-2 mb-2 text-white">
                <Star className="w-5 h-5 text-indigo-400" />
                Experience Level
              </Label>
              <select
                required
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="
                  w-full 
                  px-4 
                  py-3 
                  rounded-xl 
                  border 
                  border-slate-700 
                  bg-slate-900/50 
                  text-gray-200 
                  focus:ring-2 
                  focus:ring-blue-500
                  transition-all
                  duration-300
                "
              >
                <option value="">Select Experience Level</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={inputVariants}>
              <Label className="flex items-center gap-2 mb-2 text-white">
                <Users className="w-5 h-5 text-cyan-400" />
                Number of Positions
              </Label>
              <Input
                required
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Number of open positions"
                min="1"
                className="
                  w-full 
                  px-4 
                  py-3 
                  rounded-xl 
                  border 
                  border-slate-700 
                  bg-slate-900/50 
                  text-gray-200 
                  focus:ring-2 
                  focus:ring-blue-500
                  transition-all
                  duration-300
                "
              />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="mt-8 flex space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="
                flex 
                items-center 
                justify-center
                gap-2
                w-full 
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
                hover:shadow-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
                focus:ring-offset-slate-900
              "
            >
              <Send className="w-5 h-5" />
              Submit Job Posting
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PostJob;
