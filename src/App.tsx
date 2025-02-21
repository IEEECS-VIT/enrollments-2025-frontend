import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Domainselection from "./components/Domainselection";
import Designdomain from "./components/Designdomain";
import Technicaldomain from "./components/Technicaldomain";
import Managementdomain from "./components/Managementdomain";
import Bg from "./components/bg";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Quiz1 from "./components/Quiz1";
import Faq from "./components/Faq";
import UsernameSection from "./components/UsernameSection";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import QuizComplete from "./components/QuizCompleted";
import { disableDevTools, disableRightClick } from "./utils/SecurityUtils";
import { initGA, logPageView } from "./analytics";
import NotFound from "./components/NotFound";

const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null;
};

const AppContent = () => {
  const location = useLocation();
  useEffect(() => {
    disableDevTools();
    disableRightClick();
  }, []);

  return (
    <div className="bg-black relative min-h-screen">
      <Bg />
      {/* Hide Navbar if the path is "/quiz" */}
      {location.pathname !== "/quiz" && <Navbar />}

      <div className="relative z-20">
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route element={<ProtectedRoute />}>
            <Route path="domain" element={<Domainselection />} />
            <Route path="design" element={<Designdomain />} />
            <Route path="technical" element={<Technicaldomain />} />
            <Route path="management" element={<Managementdomain />} />
            <Route path="profile" element={<Profile />} />
            <Route path="username" element={<UsernameSection />} />
            <Route path="quiz" element={<Quiz1 />} />
            <Route path="faqs" element={<Faq />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="task" element={<Tasks />} />
            <Route path="quiz-complete" element={<QuizComplete />} />
          </Route>

          {/* Catch-all route for non-existent pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    initGA(); // Initialize Google Analytics once when app loads
  }, []);

  return (
    <Router>
      <PageTracker /> {/* Tracks page views */}
      <AppContent />
    </Router>
  );
};

export default App;
