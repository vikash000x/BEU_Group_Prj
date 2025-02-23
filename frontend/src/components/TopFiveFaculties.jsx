import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { Star, Award, Briefcase, GraduationCap, ExternalLink } from 'lucide-react';

const TopFiveFaculties = ({ faculties }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const topFive = faculties?.sort((a, b) => b.rating - a.rating).slice(0, 5);

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
          <Award className="w-12 h-12 text-blue-500 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Top Rated Faculty Members
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Meet our distinguished faculty members who have received exceptional ratings from students
          </p>
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {topFive?.map((faculty, index) => (
            <Link 
              key={faculty?.id}
              className="block group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-2xl hover:shadow-blue-500/20">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-slate-900/50 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                
                {/* Image Section */}
                <div className="relative">
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.hAaNvre1Tukr7fGuT_7_YgHaHa&pid=Api&P=0&h=180"
                    alt={faculty?.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/90 backdrop-blur-sm">
                      <Star className="w-4 h-4 text-white" fill="white" />
                      <span className="text-sm font-semibold text-white">
                        {faculty?.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-5 space-y-4">
                  <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                    {faculty?.name}
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-300 group-hover:text-slate-200 transition-colors">
                      <Briefcase className="w-4 h-4 text-blue-400" />
                      <p className="text-sm truncate">{faculty?.designation}</p>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300 group-hover:text-slate-200 transition-colors">
                      <GraduationCap className="w-4 h-4 text-blue-400" />
                      <p className="text-sm truncate">{faculty?.department}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3">
                    <button className="w-full px-4 py-2.5 text-sm font-medium text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-400/10 transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-blue-400/50">
                      View Profile
                      <ExternalLink className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-blue-400/50 rounded-xl opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopFiveFaculties;
