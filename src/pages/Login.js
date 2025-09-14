import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';
import { login as apiLogin } from '../api/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiLogin(username, password);
      // Assuming apiLogin now returns user data, or you make a subsequent call
      login(response.data); 
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="flex justify-center">
          <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn">Login</button>
            </form>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;