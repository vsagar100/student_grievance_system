import React, { useState } from 'react';
import '../styles/SignUp.css'; // Importing the CSS for styling
import SignupImage from '../assets/images/bg-02.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    collegeId: null,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Form submission logic
      console.log('Form submitted successfully');
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.mobile.trim()) errors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobile)) errors.mobile = 'Mobile number must be 10 digits';
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
    else if (formData.confirmPassword !== formData.password) errors.confirmPassword = 'Passwords do not match';
    if (!formData.collegeId) errors.collegeId = 'College ID is required';
    if (!formData.termsAccepted) errors.termsAccepted = 'You must accept the terms and conditions';

    return errors;
  };

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // File change handler
  const handleFileChange = (e) => {
    setFormData({ ...formData, collegeId: e.target.files[0] });
  };

  // Toggle the terms modal
  const toggleTermsModal = () => {
    setIsTermsModalOpen(!isTermsModalOpen);
  };

  // Check if the form is valid for enabling the submit button
  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.mobile &&
      formData.password &&
      formData.confirmPassword &&
      formData.collegeId &&
      formData.termsAccepted
    );
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img
          src={SignupImage}
          alt="Signup Background"
          className="signup-image"
        />
      </div>
      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <small>Email will be OTP verified</small>
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}
            <small>Mobile will be OTP verified</small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="collegeId">Upload your College ID</label>
            <input
              type="file"
              id="collegeId"
              name="collegeId"
              onChange={handleFileChange}
            />
            {errors.collegeId && <p className="error">{errors.collegeId}</p>}
            <small>Upload valid ID, it's validity will be verified.</small>
          </div>

          <div className="form-group checkbox-container">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
            />
            <label htmlFor="termsAccepted">
              I accept the <a href="#!" onClick={(e) => { e.preventDefault(); toggleTermsModal(); }}>terms and conditions</a>
            </label>
            {errors.termsAccepted && <p className="error">{errors.termsAccepted}</p>}
          </div>

          <div className="form-group">
            <button type="submit" className="signup-btn" disabled={!isFormValid()}>Sign Up</button>
          </div>

          <p className="login-link">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </form>
      </div>

      {/* Modal for Terms and Conditions */}
      {isTermsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleTermsModal}>&times;</span>
            <h2>Terms and Conditions</h2>
            <p>
              Welcome to our Grievance Redressal System. By using our system, you agree to the following terms and conditions:
            </p>
            <ul>
              <li><strong>Purpose:</strong> This system is intended for educational purposes, allowing students to file grievances and receive assistance.</li>
              <li><strong>User Conduct:</strong> Users must use this system responsibly and ethically, refraining from submitting false or misleading information.</li>
              <li><strong>Privacy:</strong> We are committed to protecting your privacy. Any personal information provided will be used solely for processing your grievance.</li>
              <li><strong>Data Usage:</strong> Your data may be stored and analyzed to improve the efficiency of our grievance redressal process.</li>
              <li><strong>Compliance with Indian Laws:</strong> All users must comply with relevant Indian laws, including the Information Technology Act and the Data Protection Act.</li>
            </ul>
            <p>
              By using this system, you agree to abide by these terms and conditions. If you do not agree, please refrain from using the system.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
