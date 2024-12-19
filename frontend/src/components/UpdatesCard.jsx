import React from "react";
import { Calendar, Tag, User, ArrowUpRight } from 'lucide-react';

const UpdatesCard = ({ data, setSelectedNotice, formatDate }) => {
  const { headline, category, description, postedBy, thumbnail, postedAt } = data;

  return (
    <div 
      className="group relative bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden h-[480px] border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50 hover:-translate-y-1 cursor-pointer"
      onClick={() => setSelectedNotice(data)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={headline}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          <Tag className="w-3 h-3" />
          <span>{category}</span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-slate-800/90 backdrop-blur-sm text-slate-200 px-3 py-1 rounded-full text-sm">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(postedAt)}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col h-[calc(480px-192px)]">
        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2 text-slate-400">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">{postedBy}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white/90 mb-3 line-clamp-2 leading-tight">
          {headline}
        </h2>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed flex-grow line-clamp-4">
          {description}
        </p>

        {/* Read More */}
        <div className="mt-4 flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors">
          <span className="text-sm font-medium">Read more</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default UpdatesCard;
