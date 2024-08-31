import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import StudentDashboard from './components/StudentDashboard';
import SignIn from './components/SignIn'; // Import your SignIn component
import SignUp from './components/SignUp';
import { SidebarContext } from './contexts/SidebarContext'; // Import SidebarContext
import './styles/App.css';

function App() {
  const location = useLocation(); // Get the current location
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext); // Use context

  // Define routes that do not require Sidebar, Header, and Footer
  const noAuthRoutes = ['/', '/signin', '/signup'];

  return (
    <div className={`app-container ${noAuthRoutes.includes(location.pathname) ? 'no-sidebar' : ''}`}>
      {/* Conditionally render Sidebar, Header, and Footer */}
      {!noAuthRoutes.includes(location.pathname) ? (
        <>
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <div className={`main-area ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
            <Header toggleSidebar={toggleSidebar} />
            <div className="main-content">
              <Routes>
                {/* Routes that require Sidebar, Header, and Footer */}
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                {/* Add more routes here */}
              </Routes>
              <Footer />
            </div>
          </div>
        </>
      ) : (
        <div className="auth-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', backgroundColor: '#f8f9fa', position: 'fixed', top: '0', left: '0' }}>
          <Routes>
            {/* Routes that do not require Sidebar, Header, and Footer */}
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
