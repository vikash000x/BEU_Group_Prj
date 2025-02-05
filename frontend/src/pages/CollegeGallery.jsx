import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Grid, List, Search } from "lucide-react";
import GalleryCard from "../components/GalleryCard";

const CollegeGallery = () => {
  // Dummy data for the gallery
  const galleryItems = [
    {
      image:
        "https://tse4.mm.bing.net/th?id=OIP.1x1tLdWeXevtmmOKsexFKwHaE8&pid=Api&P=0&h=180",
      eventName: "Tech Fest 2024",
      description: "An annual event showcasing innovative technology projects.",
      date: "15-16 March 2024",
      location: "Main Campus Auditorium",
    },
    {
      image:
        "https://tse2.mm.bing.net/th?id=OIP.DUWhCVhWVvbCUa7IHfFsmQHaE3&pid=Api&P=0&h=180",
      eventName: "Cultural Night",
      description:
        "A celebration of our diverse cultural heritage and traditions.",
      date: "22 April 2024",
      location: "College Amphitheatre",
    },
    {
      image:
        "https://tse3.mm.bing.net/th?id=OIP.AaHHFWTFaQyn_yXbrPsPCQHaDt&pid=Api&P=0&h=",
      eventName: "Sports Meet",
      description: "A thrilling day of sportsmanship and competition.",
      date: "10-11 May 2024",
      location: "Sports Complex",
    },
    {
      image:
        "https://tse2.mm.bing.net/th?id=OIP.DUWhCVhWVvbCUa7IHfFsmQHaE3&pid=Api&P=0&h=180",
      eventName: "Annual Day",
      description: "Celebrating academic achievements and student excellence.",
      date: "30 June 2024",
      location: "Main Campus Ground",
    },
    {
      image:
        "https://tse3.mm.bing.net/th?id=OIP.AaHHFWTFaQyn_yXbrPsPCQHaDt&pid=Api&P=0&h=",
      eventName: "Robotics Workshop",
      description: "Hands-on learning and innovation in robotics technology.",
      date: "15-17 August 2024",
      location: "Computer Science Lab",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredItems = galleryItems.filter(
    (item) =>
      item.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          College Event Gallery
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
          Explore the vibrant moments and memorable experiences from our college
          events.
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4"
      >
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setViewMode("grid")}
            className={`
              p-3 
              rounded-xl 
              transition-all 
              duration-300 
              ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-gray-400 hover:bg-slate-700"
              }
            `}
          >
            <Grid className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setViewMode("list")}
            className={`
              p-3 
              rounded-xl 
              transition-all 
              duration-300 
              ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-gray-400 hover:bg-slate-700"
              }
            `}
          >
            <List className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        className={`
          max-w-7xl 
          mx-auto 
          ${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        `}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <GalleryCard
              key={index}
              image={item.image}
              eventName={item.eventName}
              description={item.description}
              date={item.date}
              location={item.location}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-10">
            No events found matching your search.
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CollegeGallery;
