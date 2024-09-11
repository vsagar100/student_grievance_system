import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Import the Modal component
import SubmitGrievance from './SubmitGrievance'; // Import the SubmitGrievance component
import '../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false); // State for modal visibility

 // Fetch grievances from the backend API
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await fetch('http://vm-ae-mvn-ubn22.australiaeast.cloudapp.azure.com:5000/api/grievances/get/all'); // Update with your backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch grievances');
        }
        const data = await response.json();
        setGrievances(data);
      } catch (err) {
        setError('Error fetching grievances: ' + err.message);
      }
    };

    fetchGrievances();
  }, []);

  const handleOpenGrievanceModal = () => setShowGrievanceModal(true); // Function to open the modal
  const handleCloseGrievanceModal = () => setShowGrievanceModal(false); // Function to close the modal

  const handleGrievanceSubmit = (grievanceData) => {
    // Handle the grievance submission (API call or local state update)
    console.log('Grievance submitted:', grievanceData);
    // Update the grievance list (optional, based on API response)
    const newGrievance = {
      id: grievances.length + 1, // Temporary ID for the new grievance
      category: grievanceData.category,
      description: grievanceData.description,
      status: 'Submitted', // Default status
    };
    setGrievances([...grievances, newGrievance]);
  };

  return (
    <div className="dashboard-container">
      <div className="main-section">
        <div className="good-job-tile">
          <h3>Good Job, Sarah. Keep Going!!</h3>
          <p>Your tasks are 80% completed this week. Keep it up and improve your result. Progress is very good!!!</p>
          {/* Submit Grievance Button Banner */}
          <div className="submit-grievance-banner">
            <button className="submit-grievance-button" onClick={handleOpenGrievanceModal}>
              Submit Grievance
            </button>
          </div>

          {/* Grievance Modal */}
          <Modal show={showGrievanceModal} handleClose={handleCloseGrievanceModal} title="Submit Grievance">
            {/* Render the SubmitGrievance component inside the modal */}
            <SubmitGrievance
              onSubmit={handleGrievanceSubmit}
              handleClose={handleCloseGrievanceModal}
            />
          </Modal>

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
