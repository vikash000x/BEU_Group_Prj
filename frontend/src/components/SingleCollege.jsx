import React, { useEffect } from "react";
import { colleges } from "../lib/utils";
import { useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import Slider from "./Slider";
import TopFiveStudent from "./TopFiveStudent";
import TopFiveFaculties from "./TopFiveFaculties";

const SingleCollege = () => {
  const { singleCollege, setSingleCollege, setCollegeFacultyData } =
    useContext(StoreContext);
  // const [singleCollege, setSingleCollege] = useState(null);
  const { college_id } = useParams();
  const fetchSingleCollege = () => {
    const singleCollegInfo = colleges.find(
      (colleg) => colleg.shortName === college_id
    );

    setSingleCollege(singleCollegInfo);
    setCollegeFacultyData(singleCollegInfo?.faculties);
  };

  useEffect(() => {
    fetchSingleCollege();
  }, [college_id, setSingleCollege]);

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
  // console.log(singleCollege);
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
      <div className="about bg-slate-800 p-4">
        <h3 className=" underline  leading-12  decoration-[#FAB12F]   mt-4 text-4xl text-white">
          ABOUT {singleCollege?.name}
        </h3>
        <p className="font-thin leading-8 tracking-[1.5 px] text-left mt-2 text-white h-auto ">
          {singleCollege?.description}
        </p>
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
