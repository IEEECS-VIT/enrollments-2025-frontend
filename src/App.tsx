import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Domainselection from './components/Domainselection';
import Designdomain from './components/Designdomain';
import Technicaldomain from './components/Technicaldomain';
import Managementdomain from './components/Managementdomain';
import Bg from './components/bg';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Start from './components/Start';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div className="bg-black relative min-h-screen">
        <Bg />
        <Navbar />
        <div className="relative z-20">
          <Routes>
            <Route index element={<Start />} />
            <Route path="/landing" element={<Landing />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div />
                </ProtectedRoute>
              }
              >
              <Route path="domains" element={<Domainselection />} />
              <Route path="domain" element={<Domainselection />} />
              <Route path="design" element={<Designdomain />} />
              <Route path="technical" element={<Technicaldomain />} />
              <Route path="management" element={<Managementdomain />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
