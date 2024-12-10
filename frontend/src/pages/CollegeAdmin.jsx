import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { noticeList, colleges } from "../lib/utils";
import UpdatesCard from "../components/UpdatesCard";
import TopFiveFaculties from "../components/TopFiveFaculties";
import TopFiveStudent from "../components/TopFiveStudent";
import { StoreContext } from "../context/StoreContext";

const CollegeAdmin = () => {
  const [facultyList, setFacultyList] = useState({});
  const [studentList, setStudentList] = useState({});
  const [loading, setLoading] = useState(true);
  const { singleCollege, setSingleCollege, setCollegeFacultyData } =
    useContext(StoreContext);

  const collegeShortName = "bce-bhagalpur";
  const currentCollegeId = "C001";
  //const { currentCollegeId } = useParams();

  let filteredNoticeList = noticeList.filter(
    (notice) => notice.CollegeId === currentCollegeId
  );
  if (filteredNoticeList.length > 3) {
    filteredNoticeList = filteredNoticeList.slice(0, 3);
  }

  const fetchSingleCollege = () => {
    const singleCollegInfo = colleges.find(
      (colleg) => colleg.college_id === "001"
    );

    setSingleCollege(singleCollegInfo);
    setCollegeFacultyData(singleCollegInfo?.faculties);

    setFacultyList(singleCollegInfo?.faculties.slice(0, 4));
    setStudentList(singleCollegInfo?.students.slice(0, 4));
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleCollege();
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="w-[1200px] flex flex-col items-center gap-4 py-4 mx-auto text-white">
      
      <div>
        
      </div>

      <div>
        <p className="text-3xl w-[1200px] bg-slate-700 rounded mx-auto text-center font-semibold mb-4 py-4">
          Faculty List
        </p>
        <TopFiveFaculties faculties={facultyList} />
        <Link
          to={`/colleges/Faculties`}
          className="text-3xl w-[1200px] bg-slate-700 rounded mx-auto text-center font-semibold mb-4 py-4"
        >
          <p className="text-3xl w-[1200px] bg-slate-700 rounded mx-auto text-center font-semibold mb-4 py-4">
            See All Faculties
          </p>
        </Link>
      </div>

      <div>
        <p className="text-3xl w-[1200px] bg-slate-700 rounded mx-auto text-center font-semibold mb-4 py-4">
          Faculty List
        </p>
        <div className="">
          <TopFiveStudent students={singleCollege?.students} />
        </div>
        <Link
          to={`/college/students`}
          className="text-3xl w-[1200px] bg-slate-700 rounded mx-auto text-center font-semibold mb-4 py-4"
        >
          <p className="text-3xl w-[1200px] bg-slate-700 rounded mx-auto text-center font-semibold mb-4 py-4">
            See All Students
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CollegeAdmin;
