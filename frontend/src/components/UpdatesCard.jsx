import React from "react";
import { motion } from "framer-motion";
import { Calendar, Eye, ArrowUpRight } from "lucide-react";

const UpdatesCard = ({ data, setSelectedNotice, formatDate }) => {
  // Truncate description to 2 lines
  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength 
      ? text.slice(0, maxLength) + '...' 
      : text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        bg-slate-800 
        rounded-2xl 
        overflow-hidden 
        shadow-lg 
        border 
        border-slate-700 
        transition-all 
        duration-300 
        hover:-translate-y-2 
        hover:shadow-xl
        flex 
        flex-col
        h-[400px]  
      "
    >
      {/* Thumbnail */}
      {data.thumbnail && (
        <div className="relative overflow-hidden h-48">
          <img
            src={data.thumbnail}
            alt={data.headline}
            className="
              w-full 
              h-full 
              object-cover 
              transition-transform 
              duration-300 
              group-hover:scale-110
            "
          />
        </div>
      )}

      {/* Card Content */}
      <div className="
        p-6 
        flex 
        flex-col 
        flex-grow 
        justify-between 
        space-y-4
      ">
        {/* Category and Date */}
        <div className="flex items-center justify-between text-sm">
          <span 
            className="
              bg-blue-500/20 
              text-blue-400 
              px-3 
              py-1 
              rounded-full
            "
          >
            {data.category}
          </span>
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(data.postedAt)}</span>
          </div>
        </div>

        {/* Headline */}
        <h3 
          className="
            text-xl 
            font-bold 
            text-white 
            line-clamp-2 
            mb-2
            flex-grow
          "
        >
          {data.headline}
        </h3>

        {/* Description */}
        <p 
          className="
            text-slate-300 
            line-clamp-2 
            mb-4
            text-sm
            flex-grow
          "
        >
          {truncateDescription(data.description, 150)}
        </p>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedNotice(data)}
            className="
              flex 
              items-center 
              gap-2 
              bg-blue-600 
              text-white 
              px-4 
              py-2 
              rounded-lg 
              hover:bg-blue-700 
              transition-colors
              text-sm
              min-w-[120px]  
            "
          >
            <Eye className="w-4 h-4" />
            Read More
          </motion.button>

          {/* Posted By */}
          <span className="text-sm text-slate-400 truncate max-w-[50%]">
            By {data.postedBy}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default UpdatesCard;
