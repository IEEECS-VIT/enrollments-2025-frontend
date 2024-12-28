import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Domainselection from './components/Domainselection';
import Designdomain from './components/Designdomain';
import Technicaldomain from './components/Technicaldomain';
import Managementdomain from './components/Managementdomain';
import Bg from './components/bg';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="bg-black relative min-h-screen">
        <Bg />
        <Navbar />
        <div className="relative z-20">
          <Routes>
            <Route path="/" element={<Domainselection />} />
            <Route path="/design" element={<Designdomain />} />
            <Route path="/technical" element={<Technicaldomain />} />
            <Route path="/management" element={<Managementdomain />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
