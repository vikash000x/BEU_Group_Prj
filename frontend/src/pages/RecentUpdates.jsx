import React, { useEffect, useState } from "react";
import UpdatesCard from "../components/UpdatesCard";
import UpdatesPagination from "../components/UpdatesPagination";
import UpdatesPageFilter from "../components/UpdatesPageFilter";
import { noticeList } from "../lib/utils";

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
    <div className="w-[1200px] mx-auto mt-6 mb-8 text-white">
      <p className="text-3xl text-center font-serif my-2 mb-6">
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
            className="p-1 border border-gray-300 rounded-md text-sm w-40 text-white bg-slate-700 h-10 focus:outline-none focus:ring-1"
          />
          <button onClick={handleSearch} className="bg-slate-800 p-2 px-4 rounded-md hover:bg-slate-700">
            Search
          </button>
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
