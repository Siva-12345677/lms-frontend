import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseForm from '../components/CourseForm';
import { createCourse, updateCourse, getCourseById } from '../api/api';

const CourseFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        setLoading(true);
        try {
          const response = await getCourseById(id);
          setCourseData(response.data);
        } catch (error) {
          console.error('Error fetching course:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    }
  }, [id]);

  const handleSubmit = async (course) => {
    try {
      if (id) {
        await updateCourse(id, course);
      } else {
        await createCourse(course);
      }
      navigate('/courses');
    } catch (error) {
      console.error('Submission failed:', error.response?.data || error.message);
    }
  };

  if (loading) {
    return <div>Loading course details...</div>;
  }

  return (
    <div>
      <h2>{id ? 'Edit Course' : 'Create New Course'}</h2>
      <CourseForm onSubmit={handleSubmit} initialData={courseData} />
    </div>
  );
};

export default CourseFormPage;