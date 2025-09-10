import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { getStudentEnrollments } from '../api/api';

const Dashboard = () => {
  const { user, role } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (role === 'STUDENT' && user) {
        try {
          const response = await getStudentEnrollments(user.id);
          setEnrollments(response.data);
        } catch (error) {
          console.error('Failed to fetch enrollments:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user, role]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {role === 'STUDENT' && (
        <>
          <h3>My Enrollments</h3>
          {enrollments.length > 0 ? (
            <ul>
              {enrollments.map((enrollment) => (
                <li key={enrollment.enrollmentId}>
                  <h4>{enrollment.courseTitle}</h4>
                  <p>Progress: {enrollment.progressPercentage}%</p>
                  <p>Last Lesson: {enrollment.lastAccessedLesson}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have not enrolled in any courses yet.</p>
          )}
        </>
      )}
      {role === 'INSTRUCTOR' && (
        <p>Instructor dashboard view - manage your courses.</p>
      )}
      {role === 'ADMIN' && (
        <p>Admin dashboard view - manage users and content.</p>
      )}
    </div>
  );
};

export default Dashboard;