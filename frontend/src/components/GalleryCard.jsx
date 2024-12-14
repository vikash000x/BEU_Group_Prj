import React from "react";

const GalleryCard = ({ image, eventName, description }) => {
  return (
    <div className="max-w-sm rounded-lg bg-slate-800 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <img className="w-full h-48 object-cover" src={image} alt={eventName} />

      {/* Card Content */}
      <div className="p-4">
        {/* Event Name */}
        <h3 className="text-lg font-semibold text-gray-200">{eventName}</h3>

        {/* Description */}
        <p className="text-sm text-gray-300 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default GalleryCard;
