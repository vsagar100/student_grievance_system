import React, { useState } from 'react';

const SubmitGrievance = ({ onSubmit, handleClose }) => {
  const [category, setCategory] = useState('Academic');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('category', category);
  formData.append('description', description);
  formData.append('student_id', 1);  // Example, dynamically set based on the logged-in user
  if (file) {
    formData.append('file', file);
  }

  try {
    const response = await fetch('http://vm-ae-mvn-ubn22.australiaeast.cloudapp.azure.com:5000/api/grievance/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`Sentiment: ${data.sentiment}`);  // Log or display sentiment to the user
      onSubmit(data);
      handleClose();
    } else {
      setError(data.message || 'Failed to submit grievance');
    }
  } catch (error) {
    setError('An error occurred while submitting the grievance.');
  }
};

  return (
    <div>
      <h3>Submit Grievance</h3>
      {loading && <p>Submitting your grievance...</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Academic">Academic</option>
            <option value="Administration">Administration</option>
            <option value="Facilities">Facilities</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your grievance"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fileUpload">Attach File:</label>
          <input
            type="file"
            id="fileUpload"
            className="form-control-file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitGrievance;
