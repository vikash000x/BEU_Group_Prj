import React, { useEffect, useState } from "react";
import { colleges } from "../lib/utils";
import { useParams } from "react-router-dom";

const SingleCollege = () => {
  const [singleCollege, setSingleCollege] = useState(null);
  const { college_id } = useParams();
  const fetchSingleCollege = () => {
    const singleCollegInfo = colleges.find(
      (colleg) => colleg.shortName === college_id
    );

    setSingleCollege(singleCollegInfo);
  };

  useEffect(() => {
    fetchSingleCollege();
  }, [college_id]);

  // console.log(singleCollege);
  return (
    <div className="h-40">
      <h1 className="text-[2rem] font-bold my-4 text-center bg-green-600 text-white">
        {singleCollege?.name}
      </h1>
      <p className="font-thin text-center bg-slate-800 text-white">
        {singleCollege?.description}
      </p>
    </div>
  );
};

export default SingleCollege;
