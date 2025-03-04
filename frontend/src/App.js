import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LandingNav from "./components/LandingNav";
import Footer from "./components/Footer";
import JobSection from "./pages/JobSection";
import RecentUpdates from "./pages/RecentUpdates";
import JobCreation from "./pages/JobCreation";
import CollegeLogin from "./components/CollegeLogin";
import StartupLogin from "./components/StartupLogin";
import StudentLogin from "./components/StudentLogin";
import SingleCollege from "./components/SingleCollege";
import AllJob from "./pages/AllJob";
import JobDescription from "./pages/JobDescription";
import CollegeAdmin from "./pages/CollegeAdmin";
import AddFacultyForm from "./components/AddFacultyForm";
import AddStudentForm from "./components/AddStudentForm";
import PostUpdateForm from "./components/PostUpdateForm";
import AddCollegeDetailForm from "./components/AddCollegeDetailForm";
import AppliedList from "./pages/AppliedList";
import FacultiesList from "./pages/FacultiesList";
import SingleFaculty from "./pages/SingleFaculty";
import StudentList from "./pages/StudentList";
import SingleStudent from "./pages/SingleStudent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateJob from "./pages/UpdateJob";
import Student from "./pages/Student";
import CollegeGallery from "./pages/CollegeGallery";
import PrivateRoute from "./routes/PrivateRoute";
import BEUAdminDash from "./pages/BEUAdminDash";
import CollegeUpdates from "./pages/CollegeUpdates";
import BEUAdminLogin from "./pages/BEUAdminLogin";
function App() {
  return (
    <>
      <div className="App bg-[#0B192C] ">
        <ToastContainer />
        <LandingNav />

        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/beu/admin"
              element={
                <PrivateRoute>
                  <BEUAdminDash />
                </PrivateRoute>
              }
            />
            <Route path="/beu/admin/login" element={<BEUAdminLogin />} />
            <Route
              path="startup/:startUpId/dashboard"
              element={
                <PrivateRoute>
                  <JobSection />
                </PrivateRoute>
              }
            />
            <Route path="/recent-update" element={<RecentUpdates />} />
            <Route path="/job-section/Job-creation" element={<JobCreation />} />
            <Route path="/job-section/:id/applied-list" element={<AppliedList />} />
            <Route path="/alljob" element={<AllJob />} />
            <Route path="/description/:id" element={<JobDescription />} />
            <Route path="/student/:id" element={<Student />} />
            <Route path="/job-section/update-job/:id" element={<UpdateJob />} />
            <Route path="/:collegeCode/admin" element={<CollegeAdmin />} />
            <Route
              path=":collegeCode/addFaculty"
              element={<AddFacultyForm />}
            />
            <Route
              path=":collegeCode/addStudent"
              element={<AddStudentForm />}
            />
            <Route
              path=":collegeCode/post-update"
              element={<PostUpdateForm />}
            />
            <Route
              path=":collegeCode/update-college"
              element={<AddCollegeDetailForm />}
            />

            {/* ---- Amir's Routes------- */}
            <Route path="/login/college" element={<CollegeLogin />} />
            <Route path="/login/startup" element={<StartupLogin />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route
              path="beu/college/:collegecode"
              element={<SingleCollege />}
            />
            <Route
              path="/college/faculties/:collegeCode"
              element={<FacultiesList />}
            />
            <Route
              path="/college/students/:collegeCode"
              element={<StudentList />}
            />
            <Route
              path="/college/faculty/:faculty_id"
              element={<SingleFaculty />}
            />
            <Route
              path="/college/student/:student_id"
              element={<SingleStudent />}
            />
            <Route
              path="/college/gallery/:collegeCode"
              element={<CollegeGallery />}
            />
            <Route
              path="/college/updates/:collegeCode"
              element={<CollegeUpdates />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
