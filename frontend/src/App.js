import "./App.css";
import {Routes, Route} from "react-router-dom"
import LandingPage from "./pages/LandingPage";
import LandingNav from "./components/LandingNav";
import Footer from "./components/Footer";
import JobSection from "./pages/JobSection";
import RecentUpdates from "./pages/RecentUpdates";


function App() {
  return (
    <div className="App">
    <LandingNav/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/job-section" element={<JobSection/>}/>
        <Route path="/recent-update" element={<RecentUpdates/>}/>
       
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
