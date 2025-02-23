import React from "react";
import Slider from "../components/Slider";
import HomeRecentUpdates from "../components/HomeRecentUpdates";
import UniversityLeadership from "../components/UniversityLeadership";
import UniversityStats from "../components/UniversityStats";
import BranchSection from "../components/BranchSection";

const LandingPage = () => {
  const slides = [
    {
      url: "https://res.cloudinary.com/dmzgb9hm5/image/upload/v1734715664/beu/de0s4evmi6huq7nmpzoy.jpg",
      title: "Empowering Futures, Inspiring Minds",
      description: "Where Innovation Meets Education"
    },
    {
      url: "https://res.cloudinary.com/dmzgb9hm5/image/upload/v1734715695/beu/bec6izalncuyjkcmm8xy.jpg",
      title: "Discover, Learn, Transform",
      description: "Your Journey to Excellence Starts Here"
    },
    {
      url: "https://res.cloudinary.com/dmzgb9hm5/image/upload/v1734715642/beu/ao74ok69vejzhqxjiijy.jpg",
      title: "Knowledge, Growth, Leadership",
      description: "Shaping Tomorrow's Visionaries"
    }
  ];

  const containerStyles = {
    width: "100%",
    height: "90vh",
    margin: "5px auto",
  };

  return (
    <div className=" w-full">
      <div style={containerStyles}>
        <Slider slides={slides} />
      </div>
      <UniversityLeadership/>
      <UniversityStats/>
      <BranchSection/>
      <div className="w-[1200px] my-[5px] mx-auto">
        <HomeRecentUpdates />

      </div>
    </div>
  );
};

export default LandingPage;
