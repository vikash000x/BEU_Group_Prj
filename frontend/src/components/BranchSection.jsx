import React from 'react';
import { FaLaptopCode, FaBolt, FaBuilding, FaCogs, FaPlane, FaBrain, FaDna, FaIndustry } from 'react-icons/fa';

const BranchSection = () => {
  const branches = [
    {
      name: 'CSE',
      fullName: 'Computer Science & Engineering',
      icon: <FaLaptopCode />,
      description: 'Learn cutting-edge technologies and software development'
    },
    {
      name: 'EEE',
      fullName: 'Electrical & Electronics Engineering',
      icon: <FaBolt />,
      description: 'Study power systems and electronic innovations'
    },
    {
      name: 'CIVIL',
      fullName: 'Civil Engineering',
      icon: <FaBuilding />,
      description: 'Design and build sustainable infrastructure'
    },
    {
      name: 'MECHANICAL',
      fullName: 'Mechanical Engineering',
      icon: <FaCogs />,
      description: 'Master mechanics, thermodynamics and manufacturing'
    },
    {
      name: 'AERO',
      fullName: 'Aeronautical Engineering',
      icon: <FaPlane />,
      description: 'Design and develop aircraft and aerospace systems'
    },
    {
      name: 'AI',
      fullName: 'Artificial Intelligence & Machine Learning',
      icon: <FaBrain />,
      description: 'Explore machine learning and intelligent systems'
    },
    {
      name: 'BIOTECH',
      fullName: 'Biotechnology Engineering',
      icon: <FaDna />,
      description: 'Study biological systems and their applications'
    },
    {
      name: 'LEATHER',
      fullName: 'Leather Technology',
      icon: <FaIndustry />,
      description: 'Specialize in leather processing and manufacturing'
    }
  ];

  return (
    <div className="py-16 px-4 bg-white ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black/80">
          Our Engineering Branches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <span className="text-3xl text-blue-600">
                    {branch.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                  {branch.name}
                </h3>
                <p className="text-sm text-center text-gray-600 mb-3">
                  {branch.fullName}
                </p>
                <p className="text-sm text-center text-gray-500">
                  {branch.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchSection;
