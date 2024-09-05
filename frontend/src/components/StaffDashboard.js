import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Import the Modal component
import '../styles/StaffDashboard.css';

const StaffDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false); // State for modal visibility
  const [selectedGrievance, setSelectedGrievance] = useState(null); // State for selected grievance

  useEffect(() => {
    const fetchGrievances = () => {
      const dummyGrievances = [
        { id: 1, category: 'Academic', description: 'Issue with syllabus', status: 'Pending' },
        { id: 2, category: 'Administration', description: 'Problem with admin staff', status: 'Resolved' },
        { id: 3, category: 'Facilities', description: 'Broken chair in classroom', status: 'In Progress' },
      ];
      setGrievances(dummyGrievances);
    };

    fetchGrievances();
  }, []);

  const handleOpenGrievanceModal = (grievance) => {
    setSelectedGrievance(grievance); // Set the selected grievance
    setShowGrievanceModal(true); // Open the modal
  };

  const handleCloseGrievanceModal = () => {
    setShowGrievanceModal(false); // Close the modal
    setSelectedGrievance(null); // Clear the selected grievance
  };

  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    // Logic to handle grievance submission can go here
    handleCloseGrievanceModal();
  };

  return (
    <div className="dashboard-container">
      <div className="main-section">
        <div className="staff-overview-tile">
          <h3>Welcome to the Staff Dashboard</h3>
          <p>Manage and address grievances efficiently to maintain a positive educational environment.</p>
        </div>
        
        {/* Grievance Management Table */}
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
                {/* Add hyperlink to open modal */}
                <td>
                  <a href="#" onClick={() => handleOpenGrievanceModal(grievance)}>
                    {grievance.status}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Grievance Modal */}
        {selectedGrievance && (
          <Modal show={showGrievanceModal} handleClose={handleCloseGrievanceModal} title="Manage Grievance">
            <form onSubmit={handleGrievanceSubmit}>
              <div className="form-group">
                <label htmlFor="status">Update Status:</label>
                <select id="status" className="form-control" defaultValue={selectedGrievance.status}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes:</label>
                <textarea
                  id="notes"
                  className="form-control"
                  rows="4"
                  placeholder="Add any notes or comments"
                  defaultValue={selectedGrievance.description}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </Modal>
        )}
      </div>
      
      <div className="sidebar-section">
        {/* Announcements Section */}
        <div className="announcements-tile">
          <h3>Announcements & Notifications</h3>
          <ul className="announcements-list">
            <li>Staff meeting scheduled for 10th July.</li>
            <li>New guidelines for student grievances handling are now available.</li>
            <li>Update your profiles with the latest contact details.</li>
          </ul>
        </div>
        
        {/* Task Section */}
        <div className="tasks-tile">
          <h3>Assigned Tasks</h3>
          <ul className="tasks-list">
            <li>Review new grievances from students.</li>
            <li>Prepare monthly report on resolved grievances.</li>
            <li>Update the admin team on recent issues.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
