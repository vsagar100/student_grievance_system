import React, { useState, useEffect } from 'react';
import '../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    const fetchGrievances = () => {
      const dummyGrievances = [
        { id: 1, category: 'Academic', description: 'Issue with grading', status: 'Pending' },
        { id: 2, category: 'Administration', description: 'Delay in issuing certificates', status: 'Resolved' },
        { id: 3, category: 'Facilities', description: 'Maintenance required in library', status: 'In Progress' },
      ];
      setGrievances(dummyGrievances);
    };

    fetchGrievances();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="main-section">
        <div className="good-job-tile">
          <h3>Good Job, Sarah. Keep Going!!</h3>
          <p>Your tasks are 80% completed this week. Keep it up and improve your result. Progress is very good!!!</p>
          <table className="grievance-table">
            <thead>
              <tr>
                <th>Grievance ID</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {grievances.map((grievance) => (
                <tr key={grievance.id}>
                  <td>{grievance.id}</td>
                  <td>{grievance.category}</td>
                  <td>{grievance.description}</td>
                  <td>{grievance.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sidebar-section">
        {/* Announcements and Notifications Section */}
        <div className="announcements-tile">
          <h3>Announcements & Notifications</h3>
          <ul className="announcements-list">
            <li>New grading policy effective from next semester.</li>
            <li>Library will be closed for maintenance on 5th July.</li>
            <li>Submit your assignments by the end of this month.</li>
          </ul>
        </div>
        {/* Updated Upcoming Class Section */}
        <div className="upcoming-class-tile">
          <h3>Upcoming Class</h3>
          <ul className="upcoming-class-list">
            <li>
              <span className="class-name">Cara Stevens</span>
              <span className="class-time">Mathematics - 12 June '20, 09:00-10:00</span>
            </li>
            <li>
              <span className="class-name">Airi Satou</span>
              <span className="class-time">Computer Studies - 13 June '20, 11:00-12:00</span>
            </li>
            <li>
              <span className="class-name">Jens Brincker</span>
              <span className="class-time">Geography - 15 June '20, 09:30-10:30</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
