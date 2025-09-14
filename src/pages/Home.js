import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';

const Home = () => {
  const { isAuthenticated, role } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="home-hero">
        <h1>Welcome to the Learning Management System 🎓</h1>
        <p>Your platform for managing and taking online courses.</p>
      
        {!isAuthenticated ? (
          <div className="home-actions">
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="home-actions">
            {role === 'ADMIN' && (
              <Link to="/admin/users" className="btn">Manage Users</Link>
            )}
            {role === 'INSTRUCTOR' && (
              <Link to="/instructor/courses/create" className="btn">Create a New Course</Link>
            )}
            <Link to="/dashboard" className="btn">
              Go to Dashboard
            </Link>
            <Link to="/courses" className="btn btn-secondary">
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;