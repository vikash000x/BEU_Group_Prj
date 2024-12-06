// import React, { useEffect, useState } from "react";
// import UpdatesCard from "../components/UpdatesCard";
// import UpdatesPagination from "../components/UpdatesPagination";
// import UpdatesPageFilter from "../components/UpdatesPageFilter";
// import { noticeList } from "../lib/utils";

// const RecentUpdates = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [noticePerPage, setNoticePerPage] = useState(6);
//   const [currentNotices, setCurrentNotices] = useState([]);
//   const [filterType, setFilterType] = useState("");
//   const [filterOption, setFilterOption] = useState("");
//   const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     const newDisplayableNotices = noticeList.filter(
//       (notice) => notice[filterType] === filterOption
//     );
//     //console.log(newDisplayableNotices)
//     setCurrentNotices(newDisplayableNotices);
//   }, [filterOption, filterType]);

//   useEffect(() => {
//     const lastNoticeIndex = currentPage * noticePerPage;
//     const firstNoticeIndex = lastNoticeIndex - noticePerPage;
//     const displayableNotices = noticeList.slice(
//       firstNoticeIndex,
//       lastNoticeIndex
//     );
//     setCurrentNotices(displayableNotices);
//   }, [currentPage]);

//   const handleSearch = () => {
//     const filtered = noticeList.filter(
//       (item) =>
//         item.College.toLowerCase().includes(searchValue.toLowerCase()) ||
//         item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
//         item.title.toLowerCase().includes(searchValue.toLowerCase())
//     );

//     setSearchValue("")
//     setCurrentNotices(filtered);
//   };

//   return (
//     <div className="w-[1200px] mx-auto mt-6 mb-8 text-white">
//       <p className="text-3xl text-center font-serif my-2 mb-6">
//         Recent Updates
//       </p>
//       <div className="flex gap-4 py-2 justify-between">
//         <UpdatesPageFilter
//           TypeSetter={setFilterType}
//           OptionSetter={setFilterOption}
//         />
//         <div className="flex gap-2 items-center">
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             className="p-1 border border-gray-300 rounded-md text-sm w-40 text-white bg-slate-700 h-10 focus:outline-none focus:ring-1"
//           />
//           <button onClick={handleSearch} className="bg-slate-800 p-2 px-4 rounded-md hover:bg-slate-700">
//             Search
//           </button>
//         </div>
//       </div>

//       {currentNotices.map((notice, index) => {
//         return <UpdatesCard key={index} data={notice}></UpdatesCard>;
//       })}
//       <div className="mx-auto">
//         {filterType === "" && (
//           <UpdatesPagination
//             totalItems={noticeList.length}
//             itemsPerPage={noticePerPage}
//             setterFunction={setCurrentPage}
//             currentItem={currentPage}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecentUpdates;

import React, { useEffect, useState } from "react";
import UpdatesCard from "../components/UpdatesCard";
import UpdatesPagination from "../components/UpdatesPagination";
import UpdatesPageFilter from "../components/UpdatesPageFilter";
import { noticeList } from "../lib/utils";

const RecentUpdates = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [noticePerPage, setNoticePerPage] = useState(6);
  const [currentNotices, setCurrentNotices] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    const newDisplayableNotices = noticeList.filter(
      (notice) => notice[filterType] === filterOption
    );
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
    setSearchValue("");
    setCurrentNotices(filtered);
  };

  return (
    <div className="w-[1200px] mx-auto mt-6 mb-8 text-white">
      <p className="text-4xl font-bold text-center text-[#c5e935] my-2 mb-6">
        Recent Updates
      </p>
      <div className="flex gap-4 py-2 justify-between">
        <UpdatesPageFilter
          TypeSetter={setFilterType}
          OptionSetter={setFilterOption}
        />
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-1 border border-gray-300 rounded-md text-sm w-40 text-white bg-slate-200 h-10 focus:outline-none focus:ring-1"
          />
          <button
            onClick={handleSearch}
            className="bg-slate-800 border border-slate-200 p-2 px-4 rounded-md hover:bg-slate-700"
          >
            Search
          </button>
        </div>
      </div>

      {currentNotices.map((notice, index) => (
        <UpdatesCard
          key={index}
          data={notice}
          setSelectedNotice={setSelectedNotice}
        />
      ))}
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

      {/* Modal for displaying full notice */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white w-[800px] h-auto overflow-y-auto rounded-lg shadow-lg border border-gray-200 p-8 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              onClick={() => setSelectedNotice(null)}
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
              {selectedNotice.title}
            </h2>

            {/* College Information */}
            <div className="mb-4">
              <p className="text-xl font-semibold text-blue-600">
                {selectedNotice.College}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p className="text-sm">
                <strong>Date:</strong>{" "}
                <span className="text-gray-900">
                  {new Date(selectedNotice.date).toLocaleDateString()}
                </span>
              </p>
              <p className="text-sm">
                <strong>Category:</strong>{" "}
                <span className="text-gray-900">{selectedNotice.category}</span>
              </p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Description:
              </h3>
              <p className="text-gray-700">{selectedNotice.description}</p>
            </div>

            {/* Attachments */}
            {selectedNotice.attachments &&
              selectedNotice.attachments.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Attachments:
                  </h3>
                  <ul className="list-disc list-inside">
                    {selectedNotice.attachments.map((attachment, index) => (
                      <li key={index}>
                        <a
                          href={attachment.fileUrl}
                          className="text-blue-500 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {attachment.fileName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentUpdates;
