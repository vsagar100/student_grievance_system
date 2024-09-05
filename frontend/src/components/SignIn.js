import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

  const SignIn = ({ onRoleChange }) => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole.toLowerCase());
    if (onRoleChange) onRoleChange(newRole.toLowerCase()); // Update role if callback is provided
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    //navigate(`/${role.toLowerCase()}/dashboard`);
    try {
      const response = await fetch('http://vm-ae-mvn-ubn22.australiaeast.cloudapp.azure.com:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === 'success') {
        console.log(`Navigation to dashboard: /${role.toLowerCase()}/dashboard` ); // Debug log
        navigate(`/${role.toLowerCase()}/dashboard`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signin-container">
      <h1 className="main-heading">Grievance System</h1>
      <h2 className="sub-heading">Sign In</h2>
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
          className={`role-button ${role === 'Staff' ? 'active' : ''}`}
          onClick={() => handleRoleChange('Staff')}
        >
          Staff
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
