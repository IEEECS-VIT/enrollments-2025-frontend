import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Bg from "./components/bg";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Faq from "./components/Faq";
import UsernameSection from "./components/UsernameSection";
import TaskDashboard from "./components/TaskDashboard";
import { disableDevTools, disableRightClick } from "./utils/SecurityUtils";
import { initGA, logPageView } from "./analytics";
import NotFound from "./components/NotFound";
import { Navigate } from "react-router-dom";
import Tasks from "./components/Tasks";

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
                <Route path="domain" element={<Navigate to="/dashboard" replace />} />
                <Route path="design" element={<Navigate to="/dashboard" replace />} />
                <Route path="technical" element={<Navigate to="/dashboard" replace />} />
                <Route path="management" element={<Navigate to="/dashboard" replace />} />
                <Route path="profile" element={<Profile />} />
                <Route path="username" element={<UsernameSection />} />
                <Route path="quiz" element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<TaskDashboard />} />
                <Route path="task" element={<Tasks />} />
                <Route
                  path="quiz-complete"
                  element={<Navigate to="/dashboard" replace />}
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
