import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    city: '',
    dob: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const birthDate = new Date(formData.dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      setErrorMessage("You are not eligible to register.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} required />
        <button type="submit">Register</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
      <p className="small-link">
       <Link to="/login" className="red-link">Login here</Link>
      </p>
    </div>
  );
}

export default Registration;