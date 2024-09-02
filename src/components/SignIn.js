import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const SignIn = ({ onRoleChange }) => {
  const [role, setRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (onRoleChange) onRoleChange(newRole); // Update role if callback is provided
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // Hardcoded credentials for testing
    const credentials = {
      Student: { email: 'student@abc.com', password: 'student123' },
      Staff: { email: 'staff@abc.com', password: 'staff123' },
      Admin: { email: 'admin@abc.com', password: 'admin123' }
    };

    if (
      email === credentials[role].email &&
      password === credentials[role].password
    ) {
      // Redirect based on the role
      if (role === 'Student') {
        navigate('/student/dashboard');
      } else if (role === 'Staff') {
        navigate('/staff/dashboard');
      } else if (role === 'Admin') {
        navigate('/admin/dashboard');
      }
    } else {
      alert('Invalid email or password');
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
