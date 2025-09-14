import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { signup as apiSignup } from '../api/api';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    role: 'STUDENT',
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiSignup(user);
      navigate('/login');
    } catch (err) {
      setMessage('Error: ' + (err.response?.data || 'An error occurred.'));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="flex justify-center">
          <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input 
                type="text" 
                name="username" 
                placeholder="Choose a username" 
                onChange={handleChange} 
                required 
              />
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="Create a password" 
                onChange={handleChange} 
                required 
              />
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                onChange={handleChange} 
                required 
              />
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                placeholder="Enter your full name" 
                onChange={handleChange} 
                required 
              />
              <label>Role</label>
              <select name="role" onChange={handleChange} value={user.role}>
                <option value="STUDENT">Student</option>
                <option value="INSTRUCTOR">Instructor</option>
              </select>
              <button type="submit" className="btn">Sign Up</button>
            </form>
            {message && <div className={message.includes('Error') ? 'error' : 'success'}>{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;