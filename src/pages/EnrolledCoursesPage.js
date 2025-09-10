// src/pages/student/EnrolledCoursesPage.js

import React, { useState, useEffect, useContext } from 'react';
import { getStudentEnrollments } from '../api/api';
import { AuthContext } from '../components/AuthProvider';
import { Link } from 'react-router-dom';

const EnrolledCoursesPage = () => {
    const { user, role } = useContext(AuthContext);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && role === 'STUDENT') {
            fetchEnrolledCourses();
        } else if (!user) {
            setLoading(false);
            setError("Please log in to view your enrolled courses.");
        } else {
            setLoading(false);
            setError("You do not have permission to view this page.");
        }
    }, [user, role]);

    const fetchEnrolledCourses = async () => {
        try {
            const response = await getStudentEnrollments(user.id);
            setEnrollments(response.data);
        } catch (err) {
            console.error("Failed to fetch enrollments:", err);
            setError("Failed to load your enrolled courses.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading your courses...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (enrollments.length === 0) {
        return <div>You are not currently enrolled in any courses. <Link to="/">Browse courses</Link> to get started!</div>;
    }

    return (
        <div>
            <h2>My Enrolled Courses</h2>
            <ul>
                {enrollments.map(enrollment => (
                    <li key={enrollment.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h3>{enrollment.courseTitle}</h3>
                        <p>Progress: {enrollment.progress}%</p>
                        <p>Last Lesson: {enrollment.lastLesson}</p>
                        <Link to={`/courses/${enrollment.courseId}/lessons`}>Continue Learning</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EnrolledCoursesPage;