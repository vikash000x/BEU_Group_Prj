import React, { useEffect, useState } from "react";
import UpdatesCard from "../components/UpdatesCard";
import UpdatesPagination from "../components/UpdatesPagination";
import UpdatesPageFilter from "../components/UpdatesPageFilter";
import Button from "../components/Button";

const noticeList = [
  {
    id: "64f32adf4b23456789abc001",
    title: "Annual Sports Meet Announcement",
    description:
      "Join us for the Annual Sports Meet. Various events and competitions will be held.",
    date: "2024-12-01",
    CollegeId: "C001",
    College: "BHAGALPUR COLLEGE OF ENGINEERING",
    category: "Event",
    targetAudience: "Local",
    attachments: [
      {
        fileName: "SportsMeetSchedule.pdf",
        fileUrl: "https://collegewebsite.com/notices/SportsMeetSchedule.pdf",
      },
    ],
    createdAt: "2024-11-20T12:00:00.000Z",
    updatedAt: "2024-11-20T12:00:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc002",
    title: "New Library Rules",
    description:
      "The library hours have been updated. Please refer to the attached document for new rules and timings.",
    date: "2024-11-18",
    CollegeId: "C002",
    College: "GAYA COLLEGE OF ENGINEERING",
    category: "Notice",
    targetAudience: "Global",
    attachments: [
      {
        fileName: "LibraryRules.pdf",
        fileUrl: "https://collegewebsite.com/notices/LibraryRules.pdf",
      },
    ],
    createdAt: "2024-11-10T08:30:00.000Z",
    updatedAt: "2024-11-10T08:30:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc003",
    title: "Semester Exam Schedule Released",
    description:
      "The examination schedule for the upcoming semester has been released. Please check the PDF for details.",
    date: "2024-11-25",
    CollegeId: "C003",
    College: "GAYA COLLEGE OF ENGINEERING",
    category: "Exam",
    targetAudience: "Local",
    attachments: [
      {
        fileName: "ExamSchedule.pdf",
        fileUrl: "https://collegewebsite.com/notices/ExamSchedule.pdf",
      },
    ],
    createdAt: "2024-11-15T09:00:00.000Z",
    updatedAt: "2024-11-15T09:00:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc004",
    title: "Winter Break Announcement",
    description:
      "Winter break will begin from December 20th. Classes will resume on January 5th.",
    date: "2024-12-10",
    CollegeId: "C001",
    College: "GAYA COLLEGE OF ENGINEERING",
    category: "Announcement",
    targetAudience: "Global",
    attachments: [],
    createdAt: "2024-11-22T11:00:00.000Z",
    updatedAt: "2024-11-22T11:00:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc005",
    title: "Internship Opportunities",
    description:
      "New internship opportunities are available for final-year students. Check the details on the college website.",
    date: "2024-11-30",
    CollegeId: "C004",
    College: "Future Leaders University",
    category: "Announcement",
    targetAudience: "Local",
    attachments: [],
    createdAt: "2024-11-18T14:30:00.000Z",
    updatedAt: "2024-11-18T14:30:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc006",
    title: "Guest Lecture on AI",
    description:
      "A guest lecture on Artificial Intelligence will be held on December 5th. All students are encouraged to attend.",
    date: "2024-12-05",
    CollegeId: "C003",
    College: "GAYA COLLEGE OF ENGINEERING",
    category: "Event",
    targetAudience: "Global",
    attachments: [
      {
        fileName: "GuestLecturePoster.jpg",
        fileUrl: "https://collegewebsite.com/notices/GuestLecturePoster.jpg",
      },
    ],
    createdAt: "2024-11-21T10:00:00.000Z",
    updatedAt: "2024-11-21T10:00:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc007",
    title: "New Course Introduction: Data Science",
    description:
      "A new elective course on Data Science will be introduced next semester. Interested students can register online.",
    date: "2024-11-28",
    CollegeId: "C002",
    College: "GAYA COLLEGE OF ENGINEERING",
    category: "Announcement",
    targetAudience: "Local",
    attachments: [
      {
        fileName: "CourseDetails.pdf",
        fileUrl: "https://collegewebsite.com/notices/CourseDetails.pdf",
      },
    ],
    createdAt: "2024-11-12T13:15:00.000Z",
    updatedAt: "2024-11-12T13:15:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc008",
    title: "Blood Donation Camp",
    description:
      "A blood donation camp will be organized in collaboration with Red Cross Society on December 3rd. Volunteers are welcome.",
    date: "2024-12-03",
    CollegeId: "C004",
    College: "Future Leaders University",
    category: "Event",
    targetAudience: "Global",
    attachments: [
      {
        fileName: "DonationCampDetails.pdf",
        fileUrl: "https://collegewebsite.com/notices/DonationCampDetails.pdf",
      },
    ],
    createdAt: "2024-11-19T16:45:00.000Z",
    updatedAt: "2024-11-19T16:45:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc009",
    title: "Alumni Meet 2024",
    description:
      "The Alumni Meet 2024 will take place on December 25th. Alumni are invited to register online for the event.",
    date: "2024-12-25",
    CollegeId: "C001",
    College: "Greenfield College",
    category: "Sports",
    targetAudience: "Global",
    attachments: [],
    createdAt: "2024-11-23T10:20:00.000Z",
    updatedAt: "2024-11-23T10:20:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc010",
    title: "Holiday Notice: Christmas",
    description:
      "The college will remain closed on December 25th for Christmas. Happy Holidays!",
    date: "2024-12-20",
    CollegeId: "C002",
    College: "Bright Future College",
    category: "Announcement",
    targetAudience: "Global",
    attachments: [],
    createdAt: "2024-11-22T09:50:00.000Z",
    updatedAt: "2024-11-22T09:50:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc001",
    title: "Annual Sports Meet Announcement",
    description:
      "Join us for the Annual Sports Meet. Various events and competitions will be held.",
    date: "2024-12-01",
    CollegeId: "C001",
    College: "Greenfield College",
    category: "Event",
    targetAudience: "Local",
    attachments: [
      {
        fileName: "SportsMeetSchedule.pdf",
        fileUrl: "https://collegewebsite.com/notices/SportsMeetSchedule.pdf",
      },
    ],
    createdAt: "2024-11-20T12:00:00.000Z",
    updatedAt: "2024-11-20T12:00:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc002",
    title: "New Library Rules",
    description:
      "The library hours have been updated. Please refer to the attached document for new rules and timings.",
    date: "2024-11-18",
    CollegeId: "C002",
    College: "Bright Future College",
    category: "Announcement",
    targetAudience: "Global",
    attachments: [
      {
        fileName: "LibraryRules.pdf",
        fileUrl: "https://collegewebsite.com/notices/LibraryRules.pdf",
      },
    ],
    createdAt: "2024-11-10T08:30:00.000Z",
    updatedAt: "2024-11-10T08:30:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc003",
    title: "Semester Exam Schedule Released",
    description:
      "The examination schedule for the upcoming semester has been released. Please check the PDF for details.",
    date: "2024-11-25",
    CollegeId: "C003",
    College: "Tech Institute",
    category: "Exam",
    targetAudience: "Local",
    attachments: [
      {
        fileName: "ExamSchedule.pdf",
        fileUrl: "https://collegewebsite.com/notices/ExamSchedule.pdf",
      },
    ],
    createdAt: "2024-11-15T09:00:00.000Z",
    updatedAt: "2024-11-15T09:00:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc004",
    title: "Winter Break Announcement",
    description:
      "Winter break will begin from December 20th. Classes will resume on January 5th.",
    date: "2024-12-10",
    CollegeId: "C001",
    College: "Greenfield College",
    category: "Announcement",
    targetAudience: "Global",
    attachments: [],
    createdAt: "2024-11-22T11:00:00.000Z",
    updatedAt: "2024-11-22T11:00:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc005",
    title: "Internship Opportunities",
    description:
      "New internship opportunities are available for final-year students. Check the details on the college website.",
    date: "2024-11-30",
    CollegeId: "C004",
    College: "Future Leaders University",
    category: "General",
    targetAudience: "Local",
    attachments: [],
    createdAt: "2024-11-18T14:30:00.000Z",
    updatedAt: "2024-11-18T14:30:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc006",
    title: "Guest Lecture on AI",
    description:
      "A guest lecture on Artificial Intelligence will be held on December 5th. All students are encouraged to attend.",
    date: "2024-12-05",
    CollegeId: "C003",
    College: "Tech Institute",
    category: "Event",
    targetAudience: "Global",
    attachments: [
      {
        fileName: "GuestLecturePoster.jpg",
        fileUrl: "https://collegewebsite.com/notices/GuestLecturePoster.jpg",
      },
    ],
    createdAt: "2024-11-21T10:00:00.000Z",
    updatedAt: "2024-11-21T10:00:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc007",
    title: "New Course Introduction: Data Science",
    description:
      "A new elective course on Data Science will be introduced next semester. Interested students can register online.",
    date: "2024-11-28",
    CollegeId: "C002",
    College: "Bright Future College",
    category: "Announcement",
    targetAudience: "Local",
    attachments: [
      {
        fileName: "CourseDetails.pdf",
        fileUrl: "https://collegewebsite.com/notices/CourseDetails.pdf",
      },
    ],
    createdAt: "2024-11-12T13:15:00.000Z",
    updatedAt: "2024-11-12T13:15:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc008",
    title: "Blood Donation Camp",
    description:
      "A blood donation camp will be organized in collaboration with Red Cross Society on December 3rd. Volunteers are welcome.",
    date: "2024-12-03",
    CollegeId: "C004",
    College: "Future Leaders University",
    category: "Event",
    targetAudience: "Global",
    attachments: [
      {
        fileName: "DonationCampDetails.pdf",
        fileUrl: "https://collegewebsite.com/notices/DonationCampDetails.pdf",
      },
    ],
    createdAt: "2024-11-19T16:45:00.000Z",
    updatedAt: "2024-11-19T16:45:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc009",
    title: "Alumni Meet 2024",
    description:
      "The Alumni Meet 2024 will take place on December 25th. Alumni are invited to register online for the event.",
    date: "2024-12-25",
    CollegeId: "C001",
    College: "Greenfield College",
    category: "Event",
    targetAudience: "Global",
    attachments: [],
    createdAt: "2024-11-23T10:20:00.000Z",
    updatedAt: "2024-11-23T10:20:00.000Z",
  },
  {
    id: "64f32adf4b23456789abc010",
    title: "Holiday Notice: Christmas",
    description:
      "The college will remain closed on December 25th for Christmas. Happy Holidays!",
    date: "2024-12-20",
    CollegeId: "C002",
    College: "Bright Future College",
    category: "Holiday",
    targetAudience: "Global",
    attachments: [],
    createdAt: "2024-11-22T09:50:00.000Z",
    updatedAt: "2024-11-22T09:50:00.000Z",
  },
];

const RecentUpdates = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [noticePerPage, setNoticePerPage] = useState(3);
  const [currentNotices, setCurrentNotices] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const newDisplayableNotices = noticeList.filter(
      (notice) => notice[filterType] === filterOption
    );
    //console.log(newDisplayableNotices)
    setCurrentNotices(newDisplayableNotices);
  }, [filterOption, filterType]);

  useEffect(() => {
    const lastNoticeIndex = currentPage * noticePerPage;
    const firstNoticeIndex = lastNoticeIndex - noticePerPage;
    const displayableNotices = noticeList.slice(
      firstNoticeIndex,
      lastNoticeIndex
    );
    setCurrentNotices(displayableNotices);
  }, [currentPage]);

  const handleSearch = () => {
    const filtered = noticeList.filter(
      (item) =>
        item.College.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setSearchValue("")
    setCurrentNotices(filtered);
  };

  return (
    <div className="w-[1200px] mx-auto mt-6 mb-8">
      <p className="text-3xl text-center font-serif my-2 mb-6">
        Recent Updates
      </p>
      <div className="flex gap-4 py-2 justify-between">
        <UpdatesPageFilter
          TypeSetter={setFilterType}
          OptionSetter={setFilterOption}
        />
        <div>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className=" ml-2 mr-1 border border-gray-300 rounded-md text-sm w-40 h-8 focus:outline-none focus:ring-1 "
          />
          <Button text="Search" onClick={handleSearch} className="h-8" />
        </div>
      </div>

      {currentNotices.map((notice, index) => {
        return <UpdatesCard key={index} data={notice}></UpdatesCard>;
      })}
      <div className="mx-auto">
        {filterType === "" && (
          <UpdatesPagination
            totalItems={noticeList.length}
            itemsPerPage={noticePerPage}
            setterFunction={setCurrentPage}
            currentItem={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default RecentUpdates;
