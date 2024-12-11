import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const UpdatesCard = ({ data, setSelectedNotice, formatDate }) => {
  const { headline, date, category, description, postedBy, thumbnail, postedAt } = data;

  return (
    <div className="w-1/3 h-[500px] p-4">
      <div className="group bg-slate-800 shadow-md rounded-lg overflow-hidden h-full flex flex-col relative">
        {/* Top half: Image */}
        <div className="w-full h-1/2 relative overflow-hidden">
          <img
            src={thumbnail}
            alt="College Background"
            className="w-full h-full object-cover transition-all duration-400 group-hover:brightness-85"
          />
          {/* Hover Overlay */}
          <div className="absolute text-center inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-2xl font-bold">{postedBy}</p>
          </div>
        </div>
        {/* Bottom half: Content */}
        <div className="p-4 flex-grow flex flex-col">
          <h2 className="text-lg font-semibold mb-2">{headline}</h2>
          <p className="text-sm text-gray-300 mb-2">
            <strong>{postedBy}</strong>
          </p>
          <p className="text-sm text-gray-300 mb-2">
            <strong>Date:</strong> {formatDate(postedAt)}
          </p>
          <p className="text-sm text-gray-300 mb-2">
            <strong>Category:</strong> {category}
          </p>
          <p className="text-sm text-gray-400 flex-grow">
            {description.length > 100 ? `${description.slice(0, 100)}...` : description}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setSelectedNotice(data)}
              className="bg-slate-600 cursor-pointer px-3 py-1 rounded-xl hover:bg-slate-500 text-sm"
            >
              Read more..
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatesCard;
