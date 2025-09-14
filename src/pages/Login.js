import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';
import { login as apiLogin } from '../api/api';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiLogin(formData.username, formData.password);
      const userData = response.data;
      
      // Store user data and authenticate
      login(userData);
      
      // Role-based navigation
      switch (userData.role) {
        case 'STUDENT':
          navigate('/dashboard');
          break;
        case 'INSTRUCTOR':
          navigate('/courses');
          break;
        case 'ADMIN':
          navigate('/admin/users');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else if (err.response?.status === 403) {
        setError('Account access denied. Please contact support.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials for easy testing
  const fillDemoCredentials = (role) => {
    const demoCredentials = {
      student: { username: 'student', password: 'password' },
      instructor: { username: 'instructor', password: 'password' },
      admin: { username: 'admin', password: 'password' }
    };
    
    setFormData(demoCredentials[role]);
    setError(null);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your Learning Management System account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={`login-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <div className="demo-section">
          <p className="demo-title">Try Demo Accounts:</p>
          <div className="demo-buttons">
            <button 
              type="button" 
              className="demo-btn student"
              onClick={() => fillDemoCredentials('student')}
              disabled={loading}
            >
              👨‍🎓 Student Demo
            </button>
            <button 
              type="button" 
              className="demo-btn instructor"
              onClick={() => fillDemoCredentials('instructor')}
              disabled={loading}
            >
              👨‍🏫 Instructor Demo
            </button>
            <button 
              type="button" 
              className="demo-btn admin"
              onClick={() => fillDemoCredentials('admin')}
              disabled={loading}
            >
              👨‍💼 Admin Demo
            </button>
          </div>
        </div>

        <div className="login-footer">
          <p>
            Don't have an account? 
            <Link to="/signup" className="signup-link"> Create one here</Link>
          </p>
          <div className="help-links">
            <a href="#" className="help-link">Forgot Password?</a>
            <a href="#" className="help-link">Need Help?</a>
          </div>
        </div>
      </div>

      {/* Student-specific welcome message */}
      <div className="student-welcome">
        <div className="welcome-content">
          <h3>🎓 Student Portal</h3>
          <div className="student-features">
            <div className="feature">
              <span className="feature-icon">📚</span>
              <div>
                <h4>Browse Courses</h4>
                <p>Explore our extensive course catalog</p>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">📈</span>
              <div>
                <h4>Track Progress</h4>
                <p>Monitor your learning journey</p>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <div>
                <h4>Achieve Goals</h4>
                <p>Complete courses and earn certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;