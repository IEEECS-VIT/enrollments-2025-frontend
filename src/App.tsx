import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from 'react';
import Domainselection from "./components/Domainselection";
import Designdomain from "./components/Designdomain";
import Technicaldomain from "./components/Technicaldomain";
import Managementdomain from "./components/Managementdomain";
import Bg from "./components/bg";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Start from "./components/Start";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Quiz1 from "./components/Quiz1";
import Faq from "./components/Faq";
import UsernameSection from "./components/UsernameSection";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import { disableDevTools, disableRightClick } from './utils/securityUtils';

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

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div />
              </ProtectedRoute>
            }
          >
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
          </Route>
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
