import React, { useState, useEffect } from 'react';

const CourseForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      price: parseFloat(formData.price),
    };
    onSubmit(dataToSubmit);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>Course Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter course title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter course description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        
        <label>Category</label>
        <input
          type="text"
          name="category"
          placeholder="Enter course category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        
        <label>Price ($)</label>
        <input
          type="number"
          name="price"
          placeholder="Enter course price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
        
        <button type="submit" className="btn">Save Course</button>
      </form>
    </div>
  );
};

export default CourseForm;