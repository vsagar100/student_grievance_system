import React from 'react';
import '../styles/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faBook, faChartLine, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { SidebarProvider } from '../contexts/SidebarContext';

const StaffDashboard = () => {
  return (
    <div className="dashboard">
      <div className="page-title">
        <h2>Dashboard</h2>
        <p>Welcome back, Staff!</p>
      </div>
      <div className="dashboard-tiles">
        <div className="tile">
          <div className="tile-icon">
            <FontAwesomeIcon icon={faUserGraduate} />
          </div>
          <div className="tile-info">
            <h3>Students</h3>
            <p>1,200</p>
          </div>
        </div>
        <div className="tile">
          <div className="tile-icon">
            <FontAwesomeIcon icon={faBook} />
          </div>
          <div className="tile-info">
            <h3>Courses</h3>
            <p>85</p>
          </div>
        </div>
        <div className="tile">
          <div className="tile-icon">
            <FontAwesomeIcon icon={faChalkboardTeacher} />
          </div>
          <div className="tile-info">
            <h3>Instructors</h3>
            <p>50</p>
          </div>
        </div>
        <div className="tile">
          <div className="tile-icon">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <div className="tile-info">
            <h3>Reports</h3>
            <p>12</p>
          </div>
        </div>
      </div>
      <div className="charts-section">
        <div className="chart">
          <div className="chart-title">Sales Over Time</div>
          <div className="chart-placeholder">Chart Placeholder</div>
        </div>
        <div className="chart">
          <div className="chart-title">User Growth</div>
          <div className="chart-placeholder">Chart Placeholder</div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
