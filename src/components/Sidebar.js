import React, { useContext } from 'react';
import '../styles/SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserGraduate, faBook, faChartLine, faCog } from '@fortawesome/free-solid-svg-icons';
import UserProfilePic from '../assets/images/admin.jpg'; // Import a sample user profile picture

import { SidebarContext } from '../contexts/SidebarContext'; // Import SidebarContext

const Sidebar = () => {
  const { isSidebarOpen } = useContext(SidebarContext); // Use context

//const Sidebar = ({ isSidebarOpen }) => {
  return (
    <aside className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
      <div className="user-profile">
        <img src={UserProfilePic} alt="User" className="user-pic" />
        <div className={`user-info ${isSidebarOpen ? '' : 'collapsed'}`}>
          <h4>John Doe</h4>
          <p>Admin</p>
        </div>
      </div>
      <ul>
        <li>
          <a href="/student/dashboard" className="menu-top menu-toggle">
            <FontAwesomeIcon icon={faTachometerAlt} className="menu-icon" />
            <span className="hide-menu">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/admin/users" className="menu-top menu-toggle">
            <FontAwesomeIcon icon={faUserGraduate} className="menu-icon" />
            <span className="hide-menu">Students</span>
          </a>
        </li>
        <li>
          <a href="/admin/courses" className="menu-top menu-toggle">
            <FontAwesomeIcon icon={faBook} className="menu-icon" />
            <span className="hide-menu">Courses</span>
          </a>
        </li>
        <li>
          <a href="/admin/reports" className="menu-top menu-toggle">
            <FontAwesomeIcon icon={faChartLine} className="menu-icon" />
            <span className="hide-menu">Reports</span>
          </a>
        </li>
        <li>
          <a href="/admin/settings" className="menu-top menu-toggle">
            <FontAwesomeIcon icon={faCog} className="menu-icon" />
            <span className="hide-menu">Settings</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
