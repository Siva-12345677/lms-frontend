import React, { useState, useEffect } from 'react';

const LessonForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    contentUrl: '',
    duration: '',
    lessonOrder: '',
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
    onSubmit(formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>Lesson Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter lesson title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        <label>Content URL</label>
        <input
          type="url"
          name="contentUrl"
          placeholder="Enter content URL (e.g., video link)"
          value={formData.contentUrl}
          onChange={handleChange}
          required
        />
        
        <label>Duration (minutes)</label>
        <input
          type="number"
          name="duration"
          placeholder="Enter duration in minutes"
          value={formData.duration}
          onChange={handleChange}
          min="1"
          required
        />
        
        <label>Lesson Order</label>
        <input
          type="number"
          name="lessonOrder"
          placeholder="Enter lesson order number"
          value={formData.lessonOrder}
          onChange={handleChange}
          min="1"
          required
        />
        
        <button type="submit" className="btn">Save Lesson</button>
      </form>
    </div>
  );
};

export default LessonForm;