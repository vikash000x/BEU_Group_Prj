import React from "react";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const UniversityLeadership = () => {
  const leaders = [
    {
      name: "Hon. Nitish Kumar",
      position: "Chancellor",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT37DWySakMIJMytdlIXhBqdbj7qKSedIvZhg&s",
      description:
        "Distinguished academician with over 30 years of experience in higher education.",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "chancellor@university.edu",
      },
    },
    {
      name: "Prof. Suresh Kant Verma",
      position: "Vice Chancellor",
      image:
        "https://i1.rgstatic.net/ii/profile.image/1020399039037441-1620293497466_Q512/Suresh-Verma-6.jpg",
      description:
        "Leading academic innovations and research initiatives across multiple disciplines.",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "vc@university.edu",
      },
    },
    {
      name: "Hon. Sumit Kumar Singh",
      position: "DST Minister",
      image:
        "https://pbs.twimg.com/profile_images/1000448516446023680/oOBIadJy_400x400.jpg",
      description:
        "Spearheading technological advancement and scientific research policies.",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "dst.minister@gov.in",
      },
    },
    {
      name: "Hon. Sunil Kumar Singh",
      position: "Education Minister",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxaQkleRtfF8eIhwyp-JyFKxI_R3aK-CtLFQ&s",
      description:
        "Driving educational reforms and academic excellence initiatives.",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "education.minister@gov.in",
      },
    },
  ];

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          University Leadership
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Meet the distinguished leaders who guide our institution towards
          excellence in education and innovation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative group">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl flex items-center justify-center">
                  <div className="flex space-x-4">
                    <a
                      href={leader.socialLinks.linkedin}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href={leader.socialLinks.twitter}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      <FaTwitter size={24} />
                    </a>
                    <a
                      href={`mailto:${leader.socialLinks.email}`}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      <FaEnvelope size={24} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {leader.name}
                </h3>
                <div className="text-blue-600 font-semibold mb-3">
                  {leader.position}
                </div>
                <p className="text-gray-600 text-sm">{leader.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityLeadership;
