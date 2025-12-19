import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
//import Domainselection from "./components/Domainselection";
//import Designdomain from "./components/Designdomain";
//import Technicaldomain from "./components/Technicaldomain";
//import Managementdomain from "./components/Managementdomain";
import Bg from "./components/bg";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Quiz1 from "./components/Quiz1";
import Faq from "./components/Faq";
import UsernameSection from "./components/UsernameSection";
import Dashboard from "./components/Dashboard";
// import Tasks from "./components/Tasks";
import QuizComplete from "./components/QuizCompleted";
import { disableDevTools, disableRightClick } from "./utils/SecurityUtils";
import { initGA, logPageView } from "./analytics";
import NotFound from "./components/NotFound";
import { Navigate } from "react-router-dom";
// import TaskDashboard from "./components/TaskDashboard";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1.02,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

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
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Bg />
      {location.pathname !== "/quiz" && location.pathname !== "/task" && (
        <Navbar />
      )}

      <div className="relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="absolute w-full"
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Landing />} />
              <Route path="faqs" element={<Faq />} />

              <Route element={<ProtectedRoute />}>
                {/* <Route path="domain" element={<Domainselection />} />
                <Route path="design" element={<Designdomain />} />
                <Route path="technical" element={<Technicaldomain />} />
                <Route path="management" element={<Managementdomain />} /> */}
                <Route path="profile" element={<Profile />} />
                <Route path="username" element={<UsernameSection />} />
                <Route path="quiz" element={<Quiz1 />} />
                <Route path="dashboard" element={<Dashboard />} />
                {/* <Route path="task" element={<Tasks />} /> */}
                <Route path="quiz-complete" element={<QuizComplete />} />
                <Route
                  path="domain"
                  element={(() => {
                    return <Navigate to="/dashboard" />;
                  })()}
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <Router>
      <PageTracker />
      <AppContent />
    </Router>
  );
};

export default App;
