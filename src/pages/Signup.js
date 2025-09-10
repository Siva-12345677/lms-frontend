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
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <select name="role" onChange={handleChange} value={user.role}>
          <option value="STUDENT">Student</option>
          <option value="INSTRUCTOR">Instructor</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;