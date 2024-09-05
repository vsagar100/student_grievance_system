import React, { useContext, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import StudentDashboard from './components/StudentDashboard';
import StaffDashboard from './components/StaffDashboard';
import AdminDashboard from './components/AdminDashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Test from './components/Test';
import { SidebarContext } from './contexts/SidebarContext';
import './App.css';

function App() {
  const location = useLocation();
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

  const [userRole, setUserRole] = useState(null); // Start with no role to check login
  const [userName, setUserName] = useState('Ashton Cox'); // Example name
  const [userProfilePic, setUserProfilePic] = useState('https://via.placeholder.com/80'); // Placeholder image

  const handleRoleChange = (role) => {
    setUserRole(role.toLowerCase()); // Function to update the user role
  };

  const noAuthRoutes = ['/signin', '/signup', '/test'];
  
  console.log('Current user role:', userRole);

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {!noAuthRoutes.includes(location.pathname) ? (
        <>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            userRole={userRole}
            userName={userName}
            userProfilePic={userProfilePic}
          />
          <div className="main-area">
            <Header toggleSidebar={toggleSidebar} />
            <div className="main-content">
              <Routes>
                {userRole === 'student' && (
                  <Route path="/student/dashboard" element={<StudentDashboard />} />
                )}
                {userRole === 'staff' && (
                  <Route path="/staff/dashboard" element={<StaffDashboard />} />
                )}
                {userRole === 'admin' && (
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                )}                
                {/* Redirect root path to sign-in */}
                <Route path="/" element={<Navigate to="/signin" />} />
                            
              </Routes>
              <Footer />
            </div>
          </div>
        </>
      ) : (
        <div className="auth-content">
          <Routes>            
            <Route path="/signin" element={<SignIn onRoleChange={handleRoleChange} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
