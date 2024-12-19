import React, { useState } from "react";
import { colleges } from "../lib/utils";
import { Filter, School, Tag, X } from 'lucide-react';

const UpdatesPageFilter = ({ TypeSetter, OptionSetter }) => {
  const FilterOptions = [
    "Event",
    "Announcement",
    "Sports",
    "Hackathons",
    "Exam",
  ];

  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCollegeChange = (value) => {
    setSelectedCollege(value);
    TypeSetter("postedBy");
    setSelectedType("");
    OptionSetter(value);
    setIsOpen(false);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    TypeSetter("category");
    setSelectedCollege("");
    OptionSetter(value);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setSelectedCollege("");
    setSelectedType("");
    TypeSetter("");
    OptionSetter("");
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filters</span>
        {(selectedCollege || selectedType) && (
          <span className="flex items-center justify-center w-5 h-5 text-xs font-medium bg-blue-500 text-white rounded-full">
            {selectedCollege && selectedType ? '2' : '1'}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 bg-slate-900 rounded-xl shadow-xl border border-slate-700/50 overflow-hidden z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Filters</h3>
              {(selectedCollege || selectedType) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>

            {/* College Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                <School className="w-4 h-4" />
                Filter by College
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {colleges.map((college, index) => (
                  <button
                    key={index}
                    onClick={() => handleCollegeChange(college.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      selectedCollege === college.name
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-slate-300 hover:bg-slate-800'
                    } transition-colors flex items-center justify-between group`}
                  >
                    <span>{college.name}</span>
                    {selectedCollege === college.name && (
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Filter by Type
              </label>
              <div className="flex flex-wrap gap-2">
                {FilterOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleTypeChange(option)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      selectedType === option
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                        : 'text-slate-300 border border-slate-700 hover:border-slate-600'
                    } transition-all`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCollege || selectedType) && (
            <div className="border-t border-slate-700/50 p-4 bg-slate-800/50">
              <h4 className="text-sm font-medium text-slate-400 mb-2">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCollege && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-sm">
                    <School className="w-3 h-3" />
                    {selectedCollege}
                    <button
                      onClick={() => handleCollegeChange("")}
                      className="hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedType && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-sm">
                    <Tag className="w-3 h-3" />
                    {selectedType}
                    <button
                      onClick={() => handleTypeChange("")}
                      className="hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdatesPageFilter;
