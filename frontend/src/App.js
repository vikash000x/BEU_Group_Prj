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

import AppliedList from "./pages/AppliedList";


function App() {
  return (
    <div className="App ">
      <LandingNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/job-section" element={<JobSection />} />
        <Route path="/recent-update" element={<RecentUpdates />} />
        <Route path="/job-section/Job-creation" element={<JobCreation />} />
        <Route path="/login/college" element={<CollegeLogin />} />
        <Route path="/login/startup" element={<StartupLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />

        <Route path="beu/colleges/:college_id" element={<SingleCollege />} />

        <Route path="/job-section/applied-list" element={<AppliedList />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
