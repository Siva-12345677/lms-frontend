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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Lesson Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="url"
        name="contentUrl"
        placeholder="Content URL (e.g., video link)"
        value={formData.contentUrl}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="duration"
        placeholder="Duration (in minutes)"
        value={formData.duration}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="lessonOrder"
        placeholder="Lesson Order"
        value={formData.lessonOrder}
        onChange={handleChange}
        required
      />
      <button type="submit">Save Lesson</button>
    </form>
  );
};

export default LessonForm;