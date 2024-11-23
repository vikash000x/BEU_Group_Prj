import React from "react";
import Slider from "../components/Slider";
import HomeRecentUpdates from "../components/HomeRecentUpdates";

const LandingPage = () => {
  const slides = [
    {
      url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
      title: "beach",
    },
    {
      url: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "dog",
    },
    {
      url: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "beach",
    },
  ];
  const containerStyles = {
    width: "1200px",
    height: "550px",
    margin: "5px auto",
  };
  return (
    <div className=" w-full">
      <div style={containerStyles}>
        <Slider slides={slides} />
      </div>
      <div className="w-[1200px] my-[5px] mx-auto">
        <HomeRecentUpdates />
      </div>
    </div>
  );
};

export default LandingPage;
