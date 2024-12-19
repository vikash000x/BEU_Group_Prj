import React, { useEffect, useState } from "react";
// import { colleges } from "../lib/utils";
import { useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import Slider from "./Slider";
import TopFiveStudent from "./TopFiveStudent";
import TopFiveFaculties from "./TopFiveFaculties";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const SingleCollege = () => {
  const { url } = useContext(StoreContext);
  const [singleCollege, setSingleCollege] = useState(null);
  const { collegecode } = useParams();
  const fetchSingleCollege = async () => {
    try {
      const res = await axios.get(
        `${url}/college/get-single-college/${collegecode}`
      );
      if (res.data.success) {
        setSingleCollege(res.data.college);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleCollege();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const slides = [
    {
      url: "https://cdn.pixabay.com/photo/2024/01/30/12/59/women-8541959_640.jpg",
      title: "beach",
    },
    {
      url: "https://lh3.googleusercontent.com/p/AF1QipNUXehQEfTANt870xauVvDL7GIIeBHFkc7k3fdz=s1360-w1360-h1020",
      title: "dog",
    },
    {
      url: "https://ncechandi.ac.in/wp-content/uploads/2020/12/3.jpg",
      title: "beach",
    },
  ];
  const containerStyles = {
    width: "1200px",
    height: "550px",
    margin: "5px auto",
  };

  return (
    <div className=" w-[1200px] mx-auto my-2">
      <div className="bg-slate-800  rounded-md">
        <Marquee speed={100} gradient={false}>
          <h1 className="text-[2rem] font-bold my-4 text-center  text-white">
            {singleCollege?.name}
          </h1>
        </Marquee>
      </div>
      <div style={containerStyles}>
        <Slider slides={slides} />
      </div>
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 my-8 rounded-2xl shadow-2xl" data-aos="fade-up">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        <div className="relative">
          {/* Header Section */}
          <div className="flex flex-col items-start space-y-4 mb-8" data-aos="fade-right">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
              <h3 className="text-4xl font-bold text-white tracking-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{singleCollege?.name}</span>
              </h3>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>

          {/* Description Section */}
          <div className="relative" data-aos="fade-up" data-aos-delay="100">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg text-slate-300 leading-relaxed tracking-wide">
                {singleCollege?.description}
              </p>
            </div>

            {/* Decorative Quote Marks */}
            <div className="absolute -top-6 -left-4 text-8xl text-blue-500/10 font-serif">"</div>
            <div className="absolute -bottom-6 -right-4 text-8xl text-purple-500/10 font-serif rotate-180">"</div>
          </div>
        </div>
      </div>
      <div>
        <TopFiveFaculties faculties={singleCollege?.faculties} />
      </div>
      <div className="">
        <TopFiveStudent students={singleCollege?.students} />
      </div>
    </div>
  );
};

export default SingleCollege;
