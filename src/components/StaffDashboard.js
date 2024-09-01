import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Assuming you might need modals in the future
import '../styles/StaffDashboard.css';

const StaffDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const grievancesPerPage = 5;

  useEffect(() => {
    const fetchGrievances = () => {
      // Dummy grievances data, replace with real API call
      const dummyGrievances = [
        { id: 1, category: 'Academic', description: 'Issue with syllabus', status: 'Pending' },
        { id: 2, category: 'Administration', description: 'Problem with admin staff', status: 'Resolved' },
        { id: 3, category: 'Facilities', description: 'Broken chair in classroom', status: 'In Progress' },
        { id: 4, category: 'Academic', description: 'Late grade submission', status: 'Pending' },
        { id: 5, category: 'Administration', description: 'Lost student ID', status: 'Resolved' },
        { id: 6, category: 'Facilities', description: 'Air conditioning not working', status: 'Pending' },
        // Add more as needed
      ];
      setGrievances(dummyGrievances);
    };

    fetchGrievances();
  }, []);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the current grievances to display
  const indexOfLastGrievance = currentPage * grievancesPerPage;
  const indexOfFirstGrievance = indexOfLastGrievance - grievancesPerPage;
  const currentGrievances = grievances.slice(indexOfFirstGrievance, indexOfLastGrievance);

  return (
    <div className="staff-dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to the Staff Dashboard</h2>
      </div>

      <div className="dashboard-content">
        <div className="widget-container">
          {/* Widgets for quick stats */}
          <div className="widget">
            <h3>Pending Grievances</h3>
            <p>3</p>
          </div>
          <div className="widget">
            <h3>Resolved Grievances</h3>
            <p>2</p>
          </div>
          <div className="widget">
            <h3>Recent Notifications</h3>
            <p>Check your notifications for updates</p>
          </div>
        </div>

        <div className="grievance-table-container">
          <h3>Assigned Grievances</h3>
          <table className="grievance-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentGrievances.map((grievance) => (
                <tr key={grievance.id}>
                  <td>{grievance.id}</td>
                  <td>{grievance.category}</td>
                  <td>{grievance.description}</td>
                  <td>{grievance.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(grievances.length / grievancesPerPage) }, (_, index) => (
              <button
                key={index}
                className={index + 1 === currentPage ? 'active' : ''}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
