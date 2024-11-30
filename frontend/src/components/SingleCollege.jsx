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
      url: "https://media.istockphoto.com/id/1288579028/photo/buildings-of-at-the-campus-of-the-university-of-mumbai-one-of-the-first-state-universities-of.jpg?s=2048x2048&w=is&k=20&c=sbrWnUf9IsDC8QIfPB033nPfnJZq2AUiWRr5ZsnAmS4=",
      title: "dog",
    },
    {
      url: "https://media.istockphoto.com/id/483479827/photo/indian-college-students-preparing-for-examination.jpg?s=2048x2048&w=is&k=20&c=D3yVXeQ5HubC6U-gbyfGSw2LBOpFyvjOOEVwq8ocVL4=",
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
    <div className=" w-[1200px] mx-auto my-1">
      <div className="bg-[#FAB12F] rounded-md">
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
