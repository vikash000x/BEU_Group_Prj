import React from "react";
import GalleryCard from "../components/GalleryCard";

const CollegeGallery = () => {
  // Dummy data for the gallery
  const galleryItems = [
    {
      image:
        "https://tse4.mm.bing.net/th?id=OIP.1x1tLdWeXevtmmOKsexFKwHaE8&pid=Api&P=0&h=180",
      eventName: "Tech Fest 2024",
      description: "An annual event showcasing innovative technology projects.",
    },
    {
      image:
        "https://tse2.mm.bing.net/th?id=OIP.DUWhCVhWVvbCUa7IHfFsmQHaE3&pid=Api&P=0&h=180",
      eventName: "Cultural Night",
      description:
        "A celebration of our diverse cultural heritage and traditions.",
    },
    {
      image:
        "https://tse3.mm.bing.net/th?id=OIP.AaHHFWTFaQyn_yXbrPsPCQHaDt&pid=Api&P=0&h=",
      eventName: "Sports Meet",
      description: "A thrilling day of sportsmanship and competition.",
    },
    {
      image:
        "https://tse2.mm.bing.net/th?id=OIP.DUWhCVhWVvbCUa7IHfFsmQHaE3&pid=Api&P=0&h=180",
      eventName: "Cultural Night",
      description:
        "A celebration of our diverse cultural heritage and traditions.",
    },
    {
      image:
        "https://tse3.mm.bing.net/th?id=OIP.AaHHFWTFaQyn_yXbrPsPCQHaDt&pid=Api&P=0&h=",
      eventName: "Sports Meet",
      description: "A thrilling day of sportsmanship and competition.",
    },
  ];

  return (
    <div className="w-[1200px] mx-auto px-4 py-8 ">
      <h2 className="text-2xl text-white font-bol mb-6 text-center">
        Event Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <GalleryCard
            key={index}
            image={item.image}
            eventName={item.eventName}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CollegeGallery;
