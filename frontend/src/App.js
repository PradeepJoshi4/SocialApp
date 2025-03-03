import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import FeaturesSection from './components/FeatureSection';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/dashborad/Dashboard';
import AdminDashboard from './components/adminpanel/AdminDash';
import HomePage from './components/homepage/HomePage';


const App = () => {
  const [openSignup, setOpenSignup] = useState(false); // State for Signup Modal
  const [openLogin, setOpenLogin] = useState(false); // State for Login Modal
  const userRole = localStorage.getItem('userRole');

  // Functions to open and close modals
  const handleOpenSignup = () => setOpenSignup(true);
  const handleCloseSignup = () => setOpenSignup(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  return (
    <Router>
      <NavbarWrapper handleOpenSignup={handleOpenSignup} handleOpenLogin={handleOpenLogin} />
      <Routes>
        <Route path="/" element={<div><HeroSection /><FeaturesSection /><Footer /></div>} />
        <Route path="/dashboard" element={userRole !== 'admin' ? <Dashboard /> : <AdminDashboard />} />
        <Route path="/admin-dashboard" element={userRole === 'admin' ? <AdminDashboard /> : <Dashboard />} />
      </Routes>

      {/* Signup Modal */}
      <Dialog open={openSignup} onClose={handleCloseSignup}>
        <DialogContent>
          <Signup
            handleCloseSignup={handleCloseSignup} // Pass down handleCloseSignup
            handleOpenLogin={handleOpenLogin} // Pass down handleOpenLogin
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSignup} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Login Modal */}
      <Dialog open={openLogin} onClose={handleCloseLogin}>
        <DialogContent>
          <Login
            handleCloseLogin={handleCloseLogin} // Pass down handleCloseLogin
            handleOpenSignup={handleOpenSignup} // Pass down handleOpenSignup
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Router>
  );
};

const NavbarWrapper = ({ handleOpenSignup, handleOpenLogin }) => {
  const location = useLocation(); // Access the current location

  return (
    <>
      {location.pathname === '/' && (
        <Navbar handleOpenSignup={handleOpenSignup} handleOpenLogin={handleOpenLogin} />
      )}
    </>
  );
};

export default App;
