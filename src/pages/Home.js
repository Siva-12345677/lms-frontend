import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';

const Home = () => {
  const { isAuthenticated, role } = useContext(AuthContext);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to the Learning Management System (LMS) 🎓</h1>
      <p>Your platform for managing and taking online courses.</p>
      
      {!isAuthenticated ? (
        <div style={{ marginTop: '30px' }}>
          <h3>Get Started</h3>
          <p>
            <Link to="/login" style={{ marginRight: '15px', padding: '10px 20px', border: '1px solid blue' }}>
              Login
            </Link>
            or
            <Link to="/signup" style={{ marginLeft: '15px', padding: '10px 20px', border: '1px solid green' }}>
              Sign Up
            </Link>
          </p>
        </div>
      ) : (
        <div style={{ marginTop: '30px' }}>
          <h3>Quick Links</h3>
          {role === 'ADMIN' && (
            <p>
              <Link to="/admin/users" style={{ padding: '10px 20px', border: '1px solid black' }}>Manage Users</Link>
            </p>
          )}
          {role === 'INSTRUCTOR' && (
            <p>
              <Link to="/instructor/courses/create" style={{ padding: '10px 20px', border: '1px solid black' }}>Create a New Course</Link>
            </p>
          )}
          <p>
            <Link to="/dashboard" style={{ padding: '10px 20px', border: '1px solid black', marginRight: '15px' }}>
              Go to Dashboard
            </Link>
            <Link to="/courses" style={{ padding: '10px 20px', border: '1px solid black' }}>
              Browse Courses
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;