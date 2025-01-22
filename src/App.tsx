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
  import Quiz1 from './components/Quiz1';


  const App = () => {
    return (
      <Router>
        <div className="bg-black relative min-h-screen">
          <Bg />
          <Navbar />
          <div className="relative z-20">
            <Routes>
              <Route index element={<Start/>}/>
              <Route path="/domain" element={<Domainselection/>}/>
              <Route path="/landing" element={<Landing/>}/>
              <Route path="/design" element={<Designdomain />} />
              <Route path="/technical" element={<Technicaldomain />} />
              <Route path="/management" element={<Managementdomain />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/quiz" element={<Quiz1 />} />


            </Routes>
          </div>
        </div>
      </Router>
    );
  };

  export default App;
