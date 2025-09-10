// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api'; // Replace with your backend URL

// const api = axios.create({
//   baseURL: API_URL,
// });

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// export const login = (username, password) => api.post('/auth/login', { username, password });
// export const signup = (user) => api.post('/auth/signup', user);
// export const getAllUsers = () => api.get('/users');
// export const getUserById = (id) => api.get(`/users/${id}`);
// export const updateUser = (id, user) => api.put(`/users/${id}`, user);
// export const deleteUser = (id) => api.delete(`/users/${id}`);
// export const createCourse = (course) => api.post('/courses', course);
// export const getAllCourses = (page = 0, size = 10) => api.get('/courses', { params: { page, size } });
// export const createLesson = (courseId, lesson) => api.post(`/lessons/course/${courseId}`, lesson);
// export const getLessonsByCourse = (courseId) => api.get(`/lessons/course/${courseId}`);
// export const enrollStudent = (studentId, courseId) => api.post(`/enrollments/${studentId}`, { courseId });
// export const getStudentEnrollments = (studentId) => api.get(`/enrollments/${studentId}`);
// export const deleteLesson = (lessonId) => api.delete(`/lessons/${lessonId}`);
// export const updateLesson = (lessonId) => api.put(`/lessons/${lessonId}`);
// export const updateCourse = (courseId) => api.put(`/courses/${courseId}`)
// export const getCourseById = (courseId) => api.get(`/courses/${courseId}`)


// export default api;


import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const login = (username, password) => api.post('/auth/login', { username, password });
export const signup = (user) => api.post('/auth/signup', user);

// User Endpoints
export const getAllUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Course Endpoints
export const createCourse = (courseRequest) => api.post('/courses', courseRequest);
export const getAllCourses = () => api.get('/courses');
export const getCourseById = (id) => api.get(`/courses/${id}`);
export const updateCourse = (id, courseRequest) => api.put(`/courses/${id}`, courseRequest);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
// Lesson Endpoints
export const getLessonsByCourse = (courseId) => api.get(`/lessons/course/${courseId}`);
export const createLesson = (courseId, lessonDto) => api.post(`/lessons/course/${courseId}`, lessonDto);
export const updateLesson = (lessonId, lessonDto) => api.put(`/lessons/${lessonId}`, lessonDto);
export const deleteLesson = (lessonId) => api.delete(`/lessons/${lessonId}`);

// Enrollment Endpoints
export const enrollStudent = (courseId, studentId) => api.post(`/enrollments/${courseId}/${studentId}/enroll`);
export const getStudentEnrollments = (studentId) => api.get(`/enrollments/${studentId}`);
export const updateProgress = (enrollmentId, percentage, lastLesson) => api.put(`/enrollments/${enrollmentId}/progress?percentage=${percentage}&lastLesson=${lastLesson}`);

export default api;