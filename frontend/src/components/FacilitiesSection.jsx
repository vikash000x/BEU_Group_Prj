import React from 'react';
import { FaLaptop, FaBook, FaFlask, FaChalkboardTeacher, FaNetworkWired, FaGraduationCap } from 'react-icons/fa';

const FacilitiesSection = () => {
  const facilities = [
    {
      icon: <FaLaptop className="text-blue-500" />,
      title: "Advanced Computer Labs",
      description: "State-of-the-art computer laboratories with latest hardware and software infrastructure."
    },
    {
      icon: <FaBook className="text-green-500" />,
      title: "Comprehensive Library",
      description: "Extensive collection of books, journals, and digital resources for research and learning."
    },
    {
      icon: <FaFlask className="text-purple-500" />,
      title: "Research Laboratories",
      description: "Well-equipped research facilities for innovative scientific and technological exploration."
    },
    {
      icon: <FaChalkboardTeacher className="text-red-500" />,
      title: "Modern Classrooms",
      description: "Smart classrooms with interactive teaching tools and advanced learning technologies."
    },
    {
      icon: <FaNetworkWired className="text-teal-500" />,
      title: "High-Speed Internet",
      description: "Campus-wide high-speed internet connectivity for seamless digital learning."
    },
    {
      icon: <FaGraduationCap className="text-yellow-500" />,
      title: "Skill Development Center",
      description: "Dedicated center for enhancing student skills and preparing for industry challenges."
    }
  ];

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black/80">
          Our Campus Facilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div 
              key={index} 
              className="
                bg-white 
                border 
                border-gray-200 
                rounded-lg 
                p-6 
                text-center 
                shadow-md 
                hover:shadow-xl 
                transition-all 
                duration-300 
                transform 
                hover:-translate-y-2
              "
            >
              <div className="text-6xl mb-4 flex justify-center">
                {facility.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {facility.title}
              </h3>
              <p className="text-gray-600">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;
