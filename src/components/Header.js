import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Header = () => {
  const { isAuthenticated, role, logout } = useContext(AuthContext);

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f0f0f0' }}>
      <h1>LMS</h1>
      <nav>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/courses" style={{ marginRight: '10px' }}>Courses</Link>
            <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
            {role === 'ADMIN' && (
              <Link to="/admin/users" style={{ marginRight: '10px' }}>Manage Users</Link>
            )}
            <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;