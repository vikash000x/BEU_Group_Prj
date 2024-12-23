import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  Calendar, 
  MapPin, 
  X, 
  Users, 
  Clock, 
  Info 
} from "lucide-react";

const EventDetailsModal = ({ event, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="
          w-full 
          max-w-2xl 
          bg-slate-800 
          rounded-2xl 
          overflow-hidden 
          shadow-2xl 
          border 
          border-slate-700
        "
      >
        {/* Modal Header */}
        <div className="
          flex 
          items-center 
          justify-between 
          p-6 
          bg-slate-900/50 
          border-b 
          border-slate-700
        ">
          <h2 className="
            text-2xl 
            font-bold 
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-blue-400 
            to-purple-600
          ">
            {event.eventName}
          </h2>
          <motion.button
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="
              text-white 
              hover:text-red-400 
              transition-colors 
              duration-300
            "
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <motion.img 
            src={event.image}
            alt={event.eventName}
            className="
              w-full 
              h-64 
              object-cover 
              rounded-xl 
              shadow-lg
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          />

          {/* Event Details Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 bg-slate-700 p-4 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">Date</p>
                <p className="text-white font-semibold">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-700 p-4 rounded-xl">
              <MapPin className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-xs text-slate-400">Location</p>
                <p className="text-white font-semibold">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-700 p-4 rounded-xl">
              <Users className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-xs text-slate-400">Participants</p>
                <p className="text-white font-semibold">Open to All Students</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-700 p-4 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-white font-semibold">Full Day Event</p>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Info className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Event Description</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {event.description}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const GalleryCard = ({ image, eventName, description, date, location }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="
          max-w-sm 
          rounded-2xl 
          bg-slate-800/80 
          backdrop-blur-lg 
          overflow-hidden 
          shadow-2xl 
          border 
          border-slate-700/50 
          transition-all 
          duration-300 
          transform 
          hover:-translate-y-2
        ">
          {/* Image with Overlay */}
          <div className="relative overflow-hidden">
            <motion.img 
              src={image} 
              alt={eventName} 
              className="
                w-full 
                h-56 
                object-cover 
                transition-transform 
                duration-300 
                group-hover:scale-110
              "
              whileHover={{ scale: 1.1 }}
            />
            
            {/* Hover Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="
                absolute 
                inset-0 
                bg-black 
                bg-opacity-50 
                flex 
                items-center 
                justify-center
              "
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(true)}
                className="
                  bg-white/20 
                  backdrop-blur-lg 
                  text-white 
                  px-6 
                  py-3 
                  rounded-full 
                  flex 
                  items-center 
                  gap-2 
                  hover:bg-white/30 
                  transition-all 
                  duration-300
                "
              >
                <Eye className="w-5 h-5" />
                View Details
              </motion.button>
            </motion.div>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-4">
            {/* Event Name */}
            <h3 className="
              text-xl 
              font-bold 
              text-white 
              mb-2 
              group-hover:text-blue-400 
              transition-colors 
              duration-300
            ">
              {eventName}
            </h3>

            {/* Description */}
            <p className="
              text-sm 
              text-slate-300 
              line-clamp-2 
              mb-4
            ">
              {description}
            </p>

            {/* Event Details */}
            <div className="flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-xs">{date || 'TBA'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-xs">{location || 'Campus'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Gradient Background */}
        <div 
          className="
            absolute 
            -inset-0.5 
            bg-gradient-to-r 
            from-blue-500/0 
            via-blue-500/10 
            to-purple-500/0 
            rounded-2xl 
            opacity-0 
            group-hover:opacity-50 
            transition-opacity 
            duration-300 
            -z-10
          "
        />
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <EventDetailsModal 
            event={{ image, eventName, description, date, location }}
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryCard;
