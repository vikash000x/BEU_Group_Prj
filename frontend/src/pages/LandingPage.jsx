import React from "react";
import Slider from "../components/Slider";
import HomeRecentUpdates from "../components/HomeRecentUpdates";

const LandingPage = () => {
  const slides = [
    // {
    //   url: "https://i.ytimg.com/vi/3mADt-wLj7k/maxresdefault.jpg",
    //   title: "beach",
    // },
    {
      url: "https://static.toiimg.com/thumb/msid-96413561,width-1070,height-580,imgsize-2053069,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
      title: "dog",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEOCrzyKST0XqO0CU--MWIOyza7QuSZqh2MQ&s",
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
