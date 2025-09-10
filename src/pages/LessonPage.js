import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // ✅ Make sure this is imported
import { getLessonsByCourse } from '../api/api';

const LessonPage = () => {
    // ✅ Correctly get the courseId from the URL
    const { courseId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            // ✅ Add a check to ensure courseId is not undefined
            if (!courseId) {
                console.error("Course ID is missing from the URL.");
                setLoading(false);
                return;
            }

            try {
                const response = await getLessonsByCourse(courseId);
                setLessons(response.data);
            } catch (error) {
                console.error('Failed to fetch lessons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [courseId]); // ✅ Include courseId in the dependency array

    if (loading) {
        return <div>Loading lessons...</div>;
    }

    if (lessons.length === 0) {
        return <div>No lessons found for this course.</div>;
    }

    return (
        <div>
            <h2>Lessons for Course {courseId}</h2>
            <ul>
                {lessons.map(lesson => (
                    <li key={lesson.id}>
                        <h4>{lesson.title}</h4>
                        <p>Duration: {lesson.duration} minutes</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonPage;