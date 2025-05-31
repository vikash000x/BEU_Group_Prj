import React from "react";
import { useNavigate } from "react-router-dom";
import BoysHostelPage from "./BoysHostelPage";

const HostelSection = ({collegeCode}) => {
  const navigate = useNavigate();
  const hostelData = [
    {
      type: "Boys Hostel",
      name: "C.V Raman Hostel",
      image: "https://image-static.collegedunia.com/public/college_data/images/campusimage/1563170033download%20(2).jpg",
      facilities: ["24/7 Security", "Wi-Fi", "Chiller","Indoor Games","Gym", "Almirah", "Common Room", "Mess"],
      rooms: "250+ Rooms",
      capacity: "500+ Students",
      description: "Modern accommodation with well-furnished rooms and state-of-the-art facilities to ensure a comfortable stay for male students."
    },
    {
      type: "Boys Hostel",
      name: "J.C Boss Hostel",
      image: "https://image-static.collegedunia.com/public/college_data/images/appImage/1686208735file640041425d736.jpg?h=260&w=360&mode=crop",
      facilities: ["24/7 Security", "Wi-Fi", "Chiller","Indoor Games","Gym", "Almirah", "Common Room", "Mess"],
      rooms: "250+ Rooms",
      capacity: "500+ Students",
      description: "Modern accommodation with well-furnished rooms and state-of-the-art facilities to ensure a comfortable stay for male students."
    },
    {
      type: "Girls Hostel",
      name: "Ruby Girls Hostel",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_gHcMjpTo029FF38BN7WG-JXWlF4Hhnot0w&s",
      facilities: ["24/7 Security", "Wi-Fi", "Indoor Games", "Study Hall", "Mess", "Almirah", "Chiller", "Gym"],
      rooms: "200+ Rooms",
      capacity: "400+ Students",
      description: "Safe and secure accommodation with modern amenities and dedicated wardens to ensure a comfortable living experience for female students."
    }
  ];

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Campus Hostels</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Providing comfortable and secure accommodation for our students
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {hostelData.map((hostel, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => {
                const encodedName = hostel.name.toLowerCase().replace(/\s+/g, '-');
                navigate(hostel.type === "Boys Hostel" 
                  ? `/beu/college/${collegeCode}/boys-hostel/${encodedName}`
                  : `/beu/college/${collegeCode}/girls-hostel/${encodedName}`
                );
              }}
            >
              <div className="relative h-64">
                <img
                  className="w-full h-full object-cover"
                  src={hostel.image}
                  alt={hostel.name}
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {hostel.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{hostel.name}</h3>
                <p className="text-gray-600 mb-4">{hostel.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Capacity</h4>
                      <p className="text-gray-600">{hostel.capacity}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Rooms</h4>
                      <p className="text-gray-600">{hostel.rooms}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {hostel.facilities.map((facility, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostelSection;
