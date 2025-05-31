import React, { useEffect, useState } from "react";
import { FaFilePdf, FaYoutube, FaPencilAlt, FaSearch, FaHistory, FaLightbulb, FaTimes } from "react-icons/fa";
import Loader from "./loader/Loader";
import axios from "axios";
const StudyMaterialPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("materials");
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null); // 'materials' or 'previous-papers'

  // Static data for study materials
  const [studyMaterials, setStudyMaterials] = useState([]);
  useEffect(() => {
   const fetchStudyMaterials = async () => {
    setLoading(true);
    await axios.get("http://localhost:4000/api/college/all-study-material")
      .then(res => {
        setStudyMaterials(res.data);
        setLoading(false);
      }) 
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
   }
   fetchStudyMaterials();
  }, []);

  // const staticMaterials = [
  //   {
  //     id: 1,
  //     title: "Data Structures and Algorithms Notes",
  //     description: "Comprehensive notes covering all DSA topics including Arrays, Linked Lists, Trees, and Graphs",
  //     type: "pdf",
  //     semester: 3,
  //     subject: "DSA",
  //     url: "https://example.com/dsa-notes.pdf",
  //     uploadedBy: "Prof. Smith",
  //     uploadDate: "2025-01-15"
  //   },
  //   {
  //     id: 2,
  //     title: "Database Management System Handwritten Notes",
  //     description: "Detailed handwritten notes on DBMS concepts, SQL, and Normalization",
  //     type: "handwritten",
  //     semester: 4,
  //     subject: "DBMS",
  //     url: "https://example.com/dbms-notes.pdf",
  //     uploadedBy: "Prof. Johnson",
  //     uploadDate: "2025-02-20"
  //   },
  //   {
  //     id: 3,
  //     title: "Operating Systems Video Lectures",
  //     description: "Complete video series on OS concepts including Process Management and Memory Management",
  //     type: "video",
  //     semester: 5,
  //     subject: "OS",
  //     url: "https://youtube.com/playlist?os-lectures",
  //     uploadedBy: "Prof. Davis",
  //     uploadDate: "2025-03-10"
  //   },
  //   {
  //     id: 4,
  //     title: "Computer Networks PDF Notes",
  //     description: "Comprehensive study material for Computer Networks",
  //     type: "pdf",
  //     semester: 6,
  //     subject: "CN",
  //     url: "https://example.com/cn-notes.pdf",
  //     uploadedBy: "Prof. Wilson",
  //     uploadDate: "2025-03-15"
  //   },
  //   {
  //     id: 5,
  //     title: "Digital Logic Design Handwritten Notes",
  //     description: "Clear and detailed notes on Digital Logic and Circuit Design",
  //     type: "handwritten",
  //     semester: 2,
  //     subject: "DLD",
  //     url: "https://example.com/dld-notes.pdf",
  //     uploadedBy: "Prof. Brown",
  //     uploadDate: "2025-02-28"
  //   },
  //   {
  //     id: 6,
  //     title: "Advanced Java Programming Videos",
  //     description: "Video tutorials covering advanced Java concepts and frameworks",
  //     type: "video",
  //     semester: 7,
  //     subject: "Java",
  //     url: "https://youtube.com/playlist?java-advanced",
  //     uploadedBy: "Prof. Anderson",
  //     uploadDate: "2025-04-01"
  //   }
  // ];

  // Static data for previous year papers
  const previousYearPapers = [
    {
      id: 1,
      title: "Data Structures Mid Semester Exam 2024",
      subject: "DSA",
      semester: 3,
      year: 2024,
      branch: "CSE",
      type: "pdf",
      url: "https://example.com/dsa-mid-2024.pdf",
      uploadedBy: "Prof. Smith",
      uploadDate: "2025-01-15",
      solution: {
        url: "https://example.com/dsa-mid-2024-solution.pdf",
        description: "Complete solution with step-by-step explanations for all questions."
      }
    },
    {
      id: 2,
      title: "Operating Systems End Semester Exam 2024",
      subject: "OS",
      semester: 4,
      year: 2024,
      branch: "CSE",
      type: "pdf",
      url: "https://example.com/os-end-2024.pdf",
      uploadedBy: "Prof. Johnson",
      uploadDate: "2025-01-20",
      solution: {
        url: "https://example.com/os-end-2024-solution.pdf",
        description: "Detailed solutions with explanations and diagrams."
      }
    },
    {
      id: 3,
      title: "Circuit Theory Mid Semester 2023",
      subject: "Circuit Theory",
      semester: 3,
      year: 2023,
      branch: "ECE",
      type: "pdf",
      url: "https://example.com/circuit-mid-2023.pdf",
      uploadedBy: "Prof. Davis",
      uploadDate: "2024-01-10"
    },
    {
      id: 4,
      title: "Machine Design End Semester 2024",
      subject: "Machine Design",
      semester: 5,
      year: 2024,
      branch: "ME",
      type: "pdf",
      url: "https://example.com/machine-design-2024.pdf",
      uploadedBy: "Prof. Wilson",
      uploadDate: "2025-02-15"
    }
  ];

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const years = [2025, 2024, 2023, 2022];
  const branches = [
    { value: "all", label: "All Branches" },
    { value: "CSE", label: "Computer Science" },
    { value: "ECE", label: "Electronics" },
    { value: "ME", label: "Mechanical" },
    { value: "CE", label: "Civil" },
    { value: "EE", label: "Electrical" }
  ];

  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "DSA", label: "Data Structures" },
    { value: "DBMS", label: "Database Management" },
    { value: "OS", label: "Operating Systems" },
    { value: "CN", label: "Computer Networks" },
    { value: "DLD", label: "Digital Logic Design" },
    { value: "Java", label: "Advanced Java" },
    { value: "Circuit Theory", label: "Circuit Theory" },
    { value: "Machine Design", label: "Machine Design" }
  ];
  const materialTypes = [
    { value: "all", label: "All Types" },
    { value: "pdf", label: "PDF Notes" },
    { value: "handwritten", label: "Handwritten Notes" },
    { value: "video", label: "Video Lectures" },
    { value: "previous-paper", label: "Previous Year Paper" }
  ];



  const currentData = activeTab === "materials" ? studyMaterials : previousYearPapers;

  const filteredMaterials = currentData?.filter((material) => {
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = searchLower === "" || 
      material?.title.toLowerCase().includes(searchLower) ||
      (material?.description ? material?.description.toLowerCase().includes(searchLower) : false) ||
      material?.subject.toLowerCase().includes(searchLower);
    const semesterMatch = selectedSemester === "all" || material?.semester === parseInt(selectedSemester);
    const typeMatch = activeTab === "materials" ? (selectedType === "all" || material?.type === selectedType) : material?.type === "pdf";
    const subjectMatch = selectedSubject === "all" || material?.subject === selectedSubject;
    const yearMatch = selectedYear === "all" || (material?.year ? material?.year === parseInt(selectedYear) : true);
    const branchMatch = selectedBranch === "all" || (material?.branch ? material?.branch === selectedBranch : true);
    return semesterMatch && typeMatch && matchesSearch && subjectMatch && yearMatch && branchMatch;
  });

  const getIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-2xl" />;
      case "video":
        return <FaYoutube className="text-red-600 text-2xl" />;
      case "handwritten":
        return <FaPencilAlt className="text-blue-500 text-2xl" />;
      case "pdf":
        if (activeTab === "previous-papers") {
          return <FaHistory className="text-purple-500 text-2xl" />;
        }
        return <FaFilePdf className="text-red-500 text-2xl" />;
      default:
        return null;
    }
  };

  const getMaterialTypeLabel = (type) => {
    if (activeTab === "previous-papers") return "PDF";
    const materialType = materialTypes.find((t) => t.value === type);
    return materialType ? materialType.label : type;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === "materials" 
              ? "bg-blue-600 text-white" 
              : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            Study Materials
          </button>
          <button
            onClick={() => setActiveTab("previous-papers")}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === "previous-papers" 
              ? "bg-blue-600 text-white" 
              : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            Previous Year Papers
          </button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
          <p className="mt-2 text-gray-600">
            Access your course materials, notes, and video lectures
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title, description, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Semester Filter */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semester
              </label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm"
              >
                <option value="all">All Semesters</option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm"
              >
                {subjects.map((subject) => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Material Type Filter - Only for Study Materials */}
            {activeTab !== "previous-papers" && (
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm"
                >
                  {materialTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Branch and Year Filters - Only for Previous Year Papers */}
            {activeTab === "previous-papers" && (
              <>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch
                  </label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm"
                  >
                    {branches.map((branch) => (
                      <option key={branch.value} value={branch.value}>
                        {branch.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm"
                  >
                    <option value="all">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMaterials?.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-xl font-medium">No materials found matching your criteria</div>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
              </div>
            ) : (
              filteredMaterials?.map((material) => (
                <div
                  key={material?.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Header with Icon and Semester */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          {getIcon(material?.type)}
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          {material?.subject}
                        </span>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        Semester {material?.semester}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:line-clamp-none transition-all duration-200">
                      {material?.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2 hover:line-clamp-none transition-all duration-200">
                      {material?.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {activeTab === "materials" && (
                            <>
                              <span className="text-xs text-gray-500">{getMaterialTypeLabel(material?.type)}</span>
                              <span className="text-gray-300">•</span>
                            </>
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(material?.uploadDate).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                         
                          <span className="text-xs text-gray-600">{material?.uploadedBy}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 w-full sm:w-auto">
                          <a
                            href={material?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-200 w-full sm:w-auto"
                          >
                            {activeTab === "previous-papers" ? "View Paper" : "View Material"}
                          </a>
                          {activeTab === "previous-papers" && (
                            <button
                              onClick={() => {
                                setSelectedPaper(material);
                                setShowSolutionModal(true);
                              }}
                              disabled={!material.solution}
                              className={`inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 w-full sm:w-auto ${material.solution ? 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'text-gray-400 bg-gray-100 cursor-not-allowed'} focus:outline-none focus:ring-1 focus:ring-offset-1`}
                            >
                              <FaLightbulb className="mr-1.5 text-sm" />
                              {material.solution ? 'View Solution' : 'No Solution'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {/* Solution Modal */}
      {showSolutionModal && selectedPaper && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity" 
              aria-hidden="true"
              onClick={() => setShowSolutionModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaLightbulb className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Solution: {selectedPaper.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-4">
                        {selectedPaper.solution.description}
                      </p>
                      <a
                        href={selectedPaper.solution.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                      >
                        Download Solution PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowSolutionModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyMaterialPage;
