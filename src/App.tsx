import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Domainselection from "./components/Domainselection";
import Design from "./components/Design";
import Technical from "./components/Technical";
import Management from "./components/Management";
import Bg from "./components/bg";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Quiz1 from "./components/Quiz1";
import Faq from "./components/Faq";
import UsernameSection from "./components/UsernameSection";
import Dashboard from "./components/Dashboard";
import { disableDevTools, disableRightClick } from "./utils/SecurityUtils";
import { initGA, logPageView } from "./analytics";
import NotFound from "./components/NotFound";
import { Navigate } from "react-router-dom";
import QuizComplete from "./components/QuizCompleted";

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
                <Route path="domain" element={<Domainselection />} />
                <Route path="design" element={<Design />} />
                <Route path="technical" element={<Technical />} />
                <Route path="management" element={<Management />} />
                <Route path="profile" element={<Profile />} />
                <Route path="username" element={<UsernameSection />} />
                <Route path="quiz" element={<Quiz1 />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="task" element={<Navigate to="/dashboard" replace />} />
                <Route path="quiz-complete" element={<QuizComplete />} />
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
