import React, { useState, useRef, useEffect } from 'react';
import { 
  FaGraduationCap, 
  FaChalkboardTeacher, 
  FaBuilding, 
  FaAward, 
  FaGlobeAsia, 
  FaUserTie 
} from 'react-icons/fa';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const CollegeStatsSection = ({ collegeData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  // Default stats in case no data is passed
  const defaultStats = {
    totalStudents: 5000,
    facultyMembers: 250,
    departments: 8,
    researchProjects: 45,
    internationalCollaborations: 12,
    placementRate: 92
  };

  // Use passed data or fallback to default
  const stats = collegeData || defaultStats;

  const statsItems = [
    {
      icon: <FaGraduationCap className="text-blue-500 text-4xl" />,
      title: "Total Students",
      value: stats.totalStudents,
      suffix: "+"
    },
    {
      icon: <FaChalkboardTeacher className="text-green-500 text-4xl" />,
      title: "Faculty Members",
      value: stats.facultyMembers,
      suffix: "+"
    },
    {
      icon: <FaBuilding className="text-purple-500 text-4xl" />,
      title: "Departments",
      value: stats.departments,
      suffix: ""
    },
    {
      icon: <FaAward className="text-yellow-500 text-4xl" />,
      title: "Research Projects",
      value: stats.researchProjects,
      suffix: "+"
    },
    {
      icon: <FaGlobeAsia className="text-teal-500 text-4xl" />,
      title: "International Collaborations",
      value: stats.internationalCollaborations,
      suffix: "+"
    },
    {
      icon: <FaUserTie className="text-red-500 text-4xl" />,
      title: "Placement Rate",
      value: stats.placementRate,
      suffix: "%"
    }
  ];

  const onVisibilityChange = (isVisible) => {
    if (isVisible) {
      setIsVisible(true);
    }
  };

  return (
    <div 
      ref={statsRef} 
      className="py-16 px-4 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black/80">
          College Achievements & Statistics
        </h2>
        <VisibilitySensor 
          onChange={onVisibilityChange}
          partialVisibility
          offset={{bottom: 200}}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {statsItems.map((stat, index) => (
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
                <div className="mb-4 flex justify-center">
                  {stat.icon}
                </div>
                {isVisible ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    className="text-3xl font-bold text-gray-800"
                  />
                ) : (
                  <div className="text-3xl font-bold text-gray-800">0</div>
                )}
                <h3 className="text-lg font-medium text-gray-600 mt-2">
                  {stat.title}
                </h3>
              </div>
            ))}
          </div>
        </VisibilitySensor>
      </div>
    </div>
  );
};

export default CollegeStatsSection;
