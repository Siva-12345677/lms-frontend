import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses, deleteCourse, enrollStudent } from '../api/api';
import { AuthContext } from '../components/AuthProvider';

const CourseList = () => {
  const { user, role } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      setCourses(response.data.content);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      if (user && user.id) { // ✅ Corrected: Check if user and user.id exist
        if (window.confirm('Are you sure you want to enroll in this course?')) {
          await enrollStudent(courseId, user.id);
          alert('Enrolled successfully!');
        }
      } else {
        alert('You must be logged in to enroll in a course.');
      }
    } catch (error) {
      console.error('Enrollment failed:', error.response?.data || error.message);
      alert('Enrollment failed. ' + (error.response?.data?.message || 'Please try again.'));
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await deleteCourse(courseId);
      fetchCourses();
      alert('Course deleted successfully!');
    } catch (error) {
      console.error('Failed to delete course:', error);
      alert('Failed to delete course. ' + (error.response?.data?.message || 'Please try again.'));
    }
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <div>
      <div className="container">
        <h2>Courses</h2>
        
        {role === 'INSTRUCTOR' && (
          <div className="mb-4">
            <Link to="/instructor/courses/create" className="btn">
              Add New Course
            </Link>
          </div>
        )}
        
        <div className="course-list">
          {courses.map(course => (
            <div key={course.id} className="course-item">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span>Category: {course.category}</span>
                <span className="course-price">${course.price}</span>
              </div>
              <p><strong>Instructor:</strong> {course.instructorName}</p>
              
              <div className="course-actions">
                <Link to={`/courses/${course.id}/lessons`} className="btn btn-secondary">
                  View Lessons
                </Link>
                {role === 'STUDENT' && user && (
                  <button onClick={() => handleEnroll(course.id)} className="btn btn-success">
                    Enroll
                  </button>
                )}
                {role === 'INSTRUCTOR' && (
                  <>
                    <Link to={`/instructor/courses/${course.id}/edit`} className="btn">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(course.id)} className="btn btn-danger">
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;