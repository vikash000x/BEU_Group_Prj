import React, { useEffect } from "react";
import gsap from "gsap";
import Slider from "../components/Slider";
import HomeRecentUpdates from "../components/HomeRecentUpdates";
import UniversityLeadership from "../components/UniversityLeadership";
import UniversityStats from "../components/UniversityStats";
import BranchSection from "../components/BranchSection";

const LandingPage = () => {
  useEffect(() => {
    gsap.fromTo(
      "#svg",
      { y: 0, opacity: 1, scale: 1 },
      { y: -100, opacity: 0, duration: 0.8, delay: 0.8 }
    );

    gsap.fromTo(
      ".logo-name",
      { y: -20, opacity: 1 },
      { y: 100, opacity: 0, duration: 0.8, delay: 0.8 }
    );

    gsap.fromTo(
      ".loading-page",
      { opacity: 1 },
      { opacity: 0, display: "none", duration: 2, delay: 1 }
    );
  }, []);

  const slides = [
    {
      url: "https://res.cloudinary.com/dmzgb9hm5/image/upload/v1734715664/beu/de0s4evmi6huq7nmpzoy.jpg",
      title: "Empowering Futures, Inspiring Minds",
      description: "Where Innovation Meets Education",
    },
    {
      url: "https://res.cloudinary.com/dmzgb9hm5/image/upload/v1734715695/beu/bec6izalncuyjkcmm8xy.jpg",
      title: "Discover, Learn, Transform",
      description: "Your Journey to Excellence Starts Here",
    },
    {
      url: "https://res.cloudinary.com/dmzgb9hm5/image/upload/v1734715642/beu/ao74ok69vejzhqxjiijy.jpg",
      title: "Knowledge, Growth, Leadership",
      description: "Shaping Tomorrow's Visionaries",
    },
  ];

  return (
    <div className="w-full relative">
      {/* Loading Screen */}
      <div className="loading-page fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white z-50">
        {/* <svg
          id="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-40 w-40 stroke-white fill-none stroke-[3px] animate-[draw_8s_ease]"
        >
          <path d="M415.44 512h-95.11L212.12 357.46v91.1L125.69 512H28V29.82L68.47 0h108.05l123.74 176.13V63.45L386.69 0h97.69v461.5zM38.77 35.27V496l72-52.88V194l215.5 307.64h84.79l52.35-38.17h-78.27L69 13zm82.54 466.61l80-58.78v-101l-79.76-114.4v220.94L49 501.89h72.34zM80.63 10.77l310.6 442.57h82.37V10.77h-79.75v317.56L170.91 10.77zM311 191.65l72 102.81V15.93l-72 53v122.72z" />
        </svg> */}
        <svg
          id="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="h-40 w-40 stroke-white fill-none stroke-[3px] animate-[draw_8s_ease]"
        >
          <path d="M64 32C28.7 32 0 60.7 0 96L0 256 0 416c0 35.3 28.7 64 64 64l128 0c70.7 0 128-57.3 128-128c0-46.5-24.8-87.3-62-109.7c18.7-22.3 30-51 30-82.3c0-70.7-57.3-128-128-128L64 32zm96 192l-96 0L64 96l96 0c35.3 0 64 28.7 64 64s-28.7 64-64 64zM64 288l96 0 32 0c35.3 0 64 28.7 64 64s-28.7 64-64 64L64 416l0-128z" />
        </svg>

        <div className="name-container mt-8 h-8 overflow-visible">
          <div className="logo-name text-white text-2xl tracking-widest uppercase font-bold ml-5">
            Welcome to BEU
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-[90vh] my-1 mx-auto">
        <Slider slides={slides} />
      </div>
      <UniversityLeadership />
      <UniversityStats />
      <BranchSection />
      <div className="w-[1200px] my-1 mx-auto">
        <HomeRecentUpdates />
      </div>
    </div>
  );
};

export default LandingPage;
