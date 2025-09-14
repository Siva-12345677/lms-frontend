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
      <div className="container">
        <h2>Dashboard</h2>
        
        <div className="dashboard-grid">
          {role === 'STUDENT' && (
            <div className="dashboard-card">
              <h3>My Enrollments</h3>
              {enrollments.length > 0 ? (
                <div className="lesson-list">
                  {enrollments.map((enrollment) => (
                    <div key={enrollment.enrollmentId} className="card">
                      <h4>{enrollment.courseTitle}</h4>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${enrollment.progressPercentage}%` }}
                        ></div>
                      </div>
                      <p>Progress: {enrollment.progressPercentage}%</p>
                      <p>Last Lesson: {enrollment.lastAccessedLesson}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>You have not enrolled in any courses yet.</p>
              )}
            </div>
          )}
          
          {role === 'INSTRUCTOR' && (
            <div className="dashboard-card">
              <h3>Instructor Dashboard</h3>
              <p>Manage your courses and track student progress.</p>
            </div>
          )}
          
          {role === 'ADMIN' && (
            <div className="dashboard-card">
              <h3>Admin Dashboard</h3>
              <p>Manage users, courses, and system settings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;