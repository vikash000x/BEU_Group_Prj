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

function App() {
  return (
    <div className="App ">
      <LandingNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/job-section" element={<JobSection />} />
        <Route path="/recent-update" element={<RecentUpdates />} />
        <Route path="/job-section/Job-creation" element={<JobCreation />} />

        {/* ---- Amir's Routes------- */}
        <Route path="/login/college" element={<CollegeLogin />} />
        <Route path="/login/startup" element={<StartupLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
