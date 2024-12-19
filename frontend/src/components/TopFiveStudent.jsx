import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { Star, Trophy, BookOpen, GraduationCap, ExternalLink, Users } from 'lucide-react';

const TopFiveStudent = ({ students }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const topFive = students?.sort((a, b) => b.rating - a.rating).slice(0, 5);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <div className="py-16 px-4" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12" data-aos="fade-down">
          <Trophy className="w-12 h-12 text-yellow-500 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Top Performing Students
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Meet our outstanding students who have demonstrated exceptional academic performance
          </p>
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {topFive?.map((student, index) => (
            <Link 
              key={student?.id}
              className="block group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-2xl hover:shadow-yellow-500/20">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-slate-900/50 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                
                {/* Image Section */}
                <div className="relative">
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.hAaNvre1Tukr7fGuT_7_YgHaHa&pid=Api&P=0&h=180"
                    alt={student?.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/90 backdrop-blur-sm">
                      <Star className="w-4 h-4 text-white" fill="white" />
                      <span className="text-sm font-semibold text-white">
                        {student?.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-5 space-y-4">
                  <h2 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors truncate">
                    {student?.name}
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-300 group-hover:text-slate-200 transition-colors">
                      <BookOpen className="w-4 h-4 text-yellow-400" />
                      <p className="text-sm truncate">{student?.course}</p>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300 group-hover:text-slate-200 transition-colors">
                      <Users className="w-4 h-4 text-yellow-400" />
                      <p className="text-sm truncate">{student?.semester} Semester</p>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300 group-hover:text-slate-200 transition-colors">
                      <GraduationCap className="w-4 h-4 text-yellow-400" />
                      <p className="text-sm truncate">{student?.department}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3">
                    <button className="w-full px-4 py-2.5 text-sm font-medium text-yellow-400 rounded-lg border border-yellow-400/30 hover:bg-yellow-400/10 transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-yellow-400/50">
                      View Profile
                      <ExternalLink className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-yellow-400/50 rounded-xl opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopFiveStudent;
