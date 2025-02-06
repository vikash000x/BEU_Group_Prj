import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UpdatesCard from "../components/UpdatesCard";
import UpdatesPageFilter from "../components/UpdatesPageFilter";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import Loader from "../components/loader/Loader";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Calendar, 
  User, 
  Tag, 
  FileText 
} from 'lucide-react';

const NoticeDetailsModal = ({ notice, onClose, formatDate }) => {
  if (!notice) return null;
 

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="
          w-full 
          max-w-3xl 
          bg-slate-800 
          rounded-2xl 
          overflow-hidden 
          shadow-2xl 
          border 
          border-slate-700
        "
      >
        {/* Modal Header */}
        <div className="
          flex 
          items-center 
          justify-between 
          p-6 
          bg-slate-900/50 
          border-b 
          border-slate-700
        ">
          <h2 className="
            text-2xl 
            font-bold 
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-blue-400 
            to-purple-600
          ">
            {notice.headline}
          </h2>
          <motion.button
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="
              text-white 
              hover:text-red-400 
              transition-colors 
              duration-300
            "
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Notice Image */}
          {notice.thumbnail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full mb-6"
            >
              <img 
                src={notice.thumbnail} 
                alt={notice.headline} 
                className="
                  w-full 
                  h-64 
                  object-cover 
                  rounded-2xl 
                  shadow-lg 
                  hover:scale-105 
                  transition-transform 
                  duration-300
                "
              />
            </motion.div>
          )}

          {/* Event Details Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 bg-slate-700 p-4 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">Posted On</p>
                <p className="text-white font-semibold">
                  {formatDate(notice.postedAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-700 p-4 rounded-xl">
              <User className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-xs text-slate-400">Posted By</p>
                <p className="text-white font-semibold">
                  {notice.postedBy || 'Administration'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-700 p-4 rounded-xl">
              <Tag className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-xs text-slate-400">Category</p>
                <p className="text-white font-semibold">
                  {notice.category || 'General'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-700 p-4 rounded-xl">
              <FileText className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-xs text-slate-400">Type</p>
                <p className="text-white font-semibold">
                  {notice.type || 'Announcement'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Notice Details</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {notice.description}
            </p>
          </motion.div>

          {/* Attachments */}
          {notice.attachments && notice.attachments.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Attachments</h3>
              </div>
              <div className="space-y-2">
                {notice.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      block 
                      bg-slate-700 
                      p-3 
                      rounded-xl 
                      text-white 
                      hover:bg-slate-600 
                      transition-colors
                    "
                  >
                    Attachment {index + 1}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

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

  const { loading, setLoading, url } = useContext(StoreContext);

  const fetchAllNotices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${url}/notice/getAllNotices?page=${currentPage}&limit=9`
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

      {/* Notice Details Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <NoticeDetailsModal 
            notice={selectedNotice} 
            onClose={() => setSelectedNotice(null)} 
            formatDate={formatDate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecentUpdates;
