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

import AppliedList from "./pages/AppliedList";
import FacultiesList from "./pages/FacultiesList";
import SingleFaculty from "./pages/SingleFaculty";
import StudentList from "./pages/StudentList";
import SingleStudent from "./pages/SingleStudent";

function App() {
  return (
    <>
      <div className="App">
        <LandingNav />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/job-section" element={<JobSection />} />
            <Route path="/recent-update" element={<RecentUpdates />} />
            <Route path="/job-section/Job-creation" element={<JobCreation />} />
            <Route path="/job-section/applied-list" element={<AppliedList />} />
            <Route path="/alljob" element={<AllJob/>} />
            <Route path="/description/:id" element={<JobDescription/>}/>

            <Route path="/:collegeName/admin" element ={<CollegeAdmin />} />
            <Route path=":collegeShortName/addFaculty" element={<AddFacultyForm />} />
            <Route path=":collegeShortName/addStudent" element={<AddStudentForm />} />
            <Route path=":collegeShortName/post-update" element={<PostUpdateForm />} />

            {/* ---- Amir's Routes------- */}
            <Route path="/login/college" element={<CollegeLogin />} />
            <Route path="/login/startup" element={<StartupLogin />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route
              path="beu/colleges/:college_id"
              element={<SingleCollege />}
            />
            <Route path="/college/faculties" element={<FacultiesList />} />
            <Route path="/college/students" element={<StudentList />} />
            <Route
              path="/college/faculty/:faculty_id"
              element={<SingleFaculty />}
            />
            <Route
              path="/college/student/:student_id"
              element={<SingleStudent />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
