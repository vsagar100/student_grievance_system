import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const [role, setRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // Placeholder for API call to validate user credentials
    if (email === 'std@abc.com' && password === 'pwd123') {
      // Navigate to the student dashboard if role is 'Student'
      if (role === 'Student') {
        navigate('/student/dashboard');
      }
      // Additional conditions can be added here for Admin and Teacher roles
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="signin-container">
      <h1 className="main-heading">Grievance System</h1> {/* Main heading */}
      <h2 className="sub-heading">Sign In</h2> {/* Sub heading */}
      <div className="role-selection">
        <button
          className={`role-button ${role === 'Admin' ? 'active' : ''}`}
          onClick={() => handleRoleChange('Admin')}
        >
          Admin
        </button>
        <button
          className={`role-button ${role === 'Student' ? 'active' : ''}`}
          onClick={() => handleRoleChange('Student')}
        >
          Student
        </button>
        <button
          className={`role-button ${role === 'Teacher' ? 'active' : ''}`}
          onClick={() => handleRoleChange('Teacher')}
        >
          Teacher
        </button>
      </div>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </div>
        <div className="form-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#" className="forgot-password">Forgot Password?</a>
        </div>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
