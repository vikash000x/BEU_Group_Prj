import React from "react";
import logo from "../images/Screenshot 2024-11-23 023731.png";
import { useNavigate } from "react-router-dom";
import { colleges } from "../lib/utils";
import { Link } from "react-router-dom";
const LandingNav = () => {
  const navigate = useNavigate();
  // const colleges = [
  //   { name: "BHAGALPUR COLLEGE OF ENGINEERING", shortName: "bce-bhagalpur" },
  //   { name: "GAYA COLLEGE OF ENGINEERING", shortName: "gce-gaya" },
  //   { name: "DARBHANGA COLLEGE OF ENGINEERING", shortName: "dce-darbhanga" },
  //   { name: "MOTIHARI COLLEGE OF ENGINEERING", shortName: "mce-motihari" },
  //   {
  //     name: "LOK NAYAK JAI PRAKASH INSTITUTE OF TECHNOLOGY",
  //     shortName: "lnjpit-chapra",
  //   },
  //   { name: "SERSHAH ENGINEERING COLLEGE", shortName: "sec-sasaram" },
  //   {
  //     name: "RASHTRAKAVI RAMDHARI SINGH DINKAR COLLEGE OF ENGINEERING",
  //     shortName: "rrsdce-begusarai",
  //   },
  //   { name: "SUPAUL COLLEGE OF ENGINEERING", shortName: "sce-supaul" },
  //   {
  //     name: "BAKHTIYARPUR COLLEGE OF ENGINEERING",
  //     shortName: "bce-bakhtiyarpur",
  //   },
  //   { name: "SITAMARHI INSTITUTE OF TECHNOLOGY", shortName: "sit-sitamarhi" },
  //   { name: "PURNEA COLLEGE OF ENGINEERING", shortName: "pce-purnea" },
  //   {
  //     name: "B. P. MANDAL COLLEGE OF ENGINEERING",
  //     shortName: "bpcm-madhepura",
  //   },
  //   { name: "KATIHAR ENGINEERING COLLEGE", shortName: "keck-katihar" },
  //   { name: "SAHARSA COLLEGE OF ENGINEERING", shortName: "sce-saharsa" },
  //   { name: "GOVERNMENT ENGINEERING COLLEGE, JAMUI", shortName: "gec-jamui" },
  //   { name: "GOVERNMENT ENGINEERING COLLEGE, BANKA", shortName: "gec-banka" },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, VAISHALI",
  //     shortName: "gec-vaishali",
  //   },
  //   { name: "GOVERNMENT ENGINEERING COLLEGE, NAWADA", shortName: "gec-nawada" },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, KISHANGANJ",
  //     shortName: "gec-kishanganj",
  //   },
  //   { name: "GOVERNMENT ENGINEERING COLLEGE, MUNGER", shortName: "gec-munger" },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, SHEOHAR",
  //     shortName: "gec-sheohar",
  //   },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, WEST CHAMPARAN",
  //     shortName: "gec-west-champaran",
  //   },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, AURANGABAD",
  //     shortName: "gec-aurangabad",
  //   },
  //   { name: "GOVERNMENT ENGINEERING COLLEGE, KAIMUR", shortName: "gec-kaimur" },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, GOPALGANJ",
  //     shortName: "gec-gopalganj",
  //   },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, MADHUBANI",
  //     shortName: "gec-madhubani",
  //   },
  //   { name: "GOVERNMENT ENGINEERING COLLEGE, SIWAN", shortName: "gec-siwan" },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, JEHANABAD",
  //     shortName: "gec-jehanabad",
  //   },
  //   { name: "GOVERNMENT ENGINEERING COLLEGE, ARWAL", shortName: "gec-arwal" },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, KHAGARIA",
  //     shortName: "gec-khagaria",
  //   },
  //   { name: "GOVERNMENT ENGINEERING COLLEGE, BUXAR", shortName: "gec-buxar" },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, BHOJPUR",
  //     shortName: "gec-bhojpur",
  //   },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, SHEIKHPURA",
  //     shortName: "gec-sheikhpura",
  //   },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, LAKHISARAI",
  //     shortName: "gec-lakhisarai",
  //   },
  //   {
  //     name: "GOVERNMENT ENGINEERING COLLEGE, SAMASTIPUR",
  //     shortName: "gec-samastipur",
  //   },
  //   {
  //     name: "MUZAFFARPUR INSTITUTE OF TECHNOLOGY",
  //     shortName: "mit-muzaffarpur",
  //   },
  //   {
  //     name: "Shri Phanishwar Nath Renu Engineering College",
  //     shortName: "spnr-ec-araria",
  //   },
  //   { name: "NALANDA COLLEGE OF ENGINEERING", shortName: "nce-chandi" },
  // ];

  return (
    <div className="bg-[#173B45] text-blue-600 w-full h-[65px] flex items-center justify-center">
      <nav className="flex items-center justify-between w-[1200px]   px-2 text-white font-semibold">
        <img
          onClick={() => navigate("/")}
          className="w-14 h-14 rounded-full mr-8"
          src={logo}
          alt=""
        />
        <ul className="flex items-center justify-between flex-1 text-2xl">
          <li className="cursor-pointer relative group py-2 ">
            <span>Colleges</span>
            <ul className="absolute left-0 mt-2 w-60 h-[600px] overflow-y-scroll bg-white text-black rounded shadow-lg hidden group-hover:flex flex-col z-10">
              {colleges.map((college, index) => (
                <Link to={`beu/colleges/${college.shortName}`}>
                  <li
                    // onClick={() => navigate(`beu/colleges/${college.shortName}`)}
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b"
                  >
                    {college.name}
                  </li>
                </Link>
              ))}
            </ul>
          </li>

          <li className="cursor-pointer">Recent Updates</li>
          <li className="cursor-pointer">Jobs</li>
          <li className="cursor-pointer relative group py-2">
            <span>Login</span>
            <ul className="absolute right-0 mt-2 w-60 bg-white text-black rounded shadow-lg hidden group-hover:flex flex-col z-10">
              <li
                onClick={() => navigate("/login/college")}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b"
              >
                Lognin as Colleg
              </li>
              <li
                onClick={() => navigate("/login/startup")}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b"
              >
                Login as Stratup
              </li>
              <li
                onClick={() => navigate("/login/student")}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b"
              >
                Login as Student
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LandingNav;
