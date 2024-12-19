import React, { useContext, useEffect, useState } from "react";
import UpdatesCard from "../components/UpdatesCard";
import UpdatesPageFilter from "../components/UpdatesPageFilter";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import Loader from "../components/loader/Loader";
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const RecentUpdates = () => {
  const [noticeList, setNoticeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [filterType, setFilterType] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const { loading, setLoading } = useContext(StoreContext);

  const fetchAllNotices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/notice/getAllNotices?page=${currentPage}&limit=9`,
        { withCredentials: true }
      );
      const { notices, pagination } = response.data;
      setNoticeList(notices);
      setTotalPages(pagination.totalPages);
      setTotalItems(pagination.totalItems);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNotices();
  }, [currentPage]);

  useEffect(() => {
    if (filterType && filterOption) {
      const filtered = noticeList.filter(
        (notice) => notice[filterType] === filterOption
      );
      const sortedFiltered = [...filtered].sort((a, b) => 
        new Date(b.postedAt) - new Date(a.postedAt)
      );
      setNoticeList(sortedFiltered);
    }
  }, [filterType, filterOption]);

  const handleSearch = () => {
    if (!searchValue.trim()) {
      fetchAllNotices();
      return;
    }
    
    const filtered = noticeList?.filter(
      (item) =>
        item.postedBy?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.headline?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
    const sortedFiltered = [...filtered].sort((a, b) => 
      new Date(b.postedAt) - new Date(a.postedAt)
    );
    setNoticeList(sortedFiltered);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Recent Updates
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Stay informed with the latest updates, announcements, and events from colleges across the platform.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
          <UpdatesPageFilter
            TypeSetter={setFilterType}
            OptionSetter={setFilterOption}
          />

          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search updates..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full sm:w-64 px-4 py-2 pl-10 bg-slate-800 text-slate-200 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {noticeList?.map((notice, index) => (
            <UpdatesCard
              key={index}
              data={notice}
              setSelectedNotice={setSelectedNotice}
              formatDate={formatDate}
            />
          ))}
        </div>

        {/* No Results */}
        {(!noticeList || noticeList.length === 0) && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No updates found.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !filterType && !filterOption && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              } transition-colors`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              // Show first page, last page, current page, and one page before and after current page
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === pageNumber
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    } transition-colors`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <span key={pageNumber} className="text-slate-600">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              } transition-colors`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedNotice && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="bg-slate-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border border-slate-700 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                    {selectedNotice.category}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {formatDate(selectedNotice.postedAt)}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">
                {selectedNotice.headline}
              </h2>

              <p className="text-slate-300 mb-6 whitespace-pre-wrap">
                {selectedNotice.description}
              </p>

              <div className="flex items-center gap-2 text-slate-400">
                <span>Posted by:</span>
                <span className="font-medium text-white">
                  {selectedNotice.postedBy}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentUpdates;
