import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";

const BoysHostelPage = () => {
  const { collegecode, hostelName } = useParams();
  const displayName = hostelName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  const hostelImages = [
    {
      url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3",
      caption: "Hostel Building Front View"
    },
    {
      url: "https://images.unsplash.com/photo-1573069419338-7b6052a917f7?ixlib=rb-4.0.3",
      caption: "Student Room"
    },
    {
      url: "https://images.unsplash.com/photo-1577129076068-d5e1684f53e8?ixlib=rb-4.0.3",
      caption: "Common Area"
    },
    {
      url: "https://images.unsplash.com/photo-1567527879229-de1b3c4dde15?ixlib=rb-4.0.3",
      caption: "Study Room"
    }
  ];

  const facilities = [
    {
      category: "Accommodation",
      items: [
        "Single, Double, and Triple Occupancy Rooms",
        "Attached Bathrooms",
        "24/7 Hot & Cold Water Supply",
        "Well-ventilated Rooms",
        "Individual Study Tables and Wardrobes"
      ]
    },
    {
      category: "Security & Safety",
      items: [
        "24/7 Security Personnel",
        "CCTV Surveillance",
        "Biometric Entry System",
        "Fire Safety Equipment",
        "Emergency Response Team"
      ]
    },
    {
      category: "Dining & Kitchen",
      items: [
        "Modern Mess Facility",
        "Nutritious Vegetarian & Non-vegetarian Options",
        "Hygienic Kitchen",
        "Special Diet Accommodation",
        "24/7 Water Purifiers"
      ]
    },
    {
      category: "Recreation & Amenities",
      items: [
        "Indoor Games Room",
        "Gym Facility",
        "TV Room with DTH Connection",
        "Reading Room",
        "High-speed Wi-Fi"
      ]
    }
  ];

  const rules = [
    "Strict adherence to hostel timings",
    "Mandatory attendance during night hours",
    "No visitors allowed in residential areas",
    "Maintain cleanliness and hygiene",
    "Ragging is strictly prohibited"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{displayName} - Boys Hostel</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A home away from home, providing comfortable accommodation with modern amenities
            and a conducive environment for academic excellence.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {hostelImages.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-48 object-cover"
              />
              <p className="p-4 text-center text-gray-700 bg-white">{image.caption}</p>
            </div>
          ))}
        </div>

        {/* Quick Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Capacity</h3>
              <p className="text-gray-600">500+ Students</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Room Types</h3>
              <p className="text-gray-600">Single, Double & Triple Sharing</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Wardens</h3>
              <p className="text-gray-600">3 Block Wardens + Chief Warden</p>
            </div>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Facilities & Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{facility.category}</h3>
                <ul className="space-y-3">
                  {facility.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <IoMdCheckmarkCircleOutline className="text-green-500 mr-2 text-xl" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Rules Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Hostel Rules & Regulations</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule, index) => (
              <li key={index} className="flex items-center text-white">
                <IoMdCheckmarkCircleOutline className="mr-2 text-xl" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BoysHostelPage;
