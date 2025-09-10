
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './components/AuthProvider';
// import Header from './components/Header';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import CourseList from './pages/CourseList';
// import Dashboard from './pages/Dashboard';
// import UserList from './pages/UserList';
// import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';
// import CourseFormPage from './pages/CourseFormPage';
// import LessonPage from './pages/LessonPage';
// import InstructorRoute from './components/InstructorRoute';

// const App = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <Header />
//         <div style={{ padding: '20px' }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/courses" element={<PrivateRoute><CourseList /></PrivateRoute>} />
//             <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//             <Route path="/admin/users" element={<AdminRoute><UserList /></AdminRoute>} />
//             <Route path="/instructor/courses/create" element={<InstructorRoute><CourseFormPage /></InstructorRoute>} />
//             <Route path="/instructor/courses/:id/edit" element={<InstructorRoute><CourseFormPage /></InstructorRoute>} />
//             <Route path="/courses/:courseId/lessons" element={<PrivateRoute><LessonPage /></PrivateRoute>} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </div>
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseList from './pages/CourseList';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import CourseFormPage from './pages/CourseFormPage';
import LessonPage from './pages/LessonPage';
import InstructorRoute from './components/InstructorRoute';

// New Imports for Student Routes
import EnrolledCoursesPage from './pages/EnrolledCoursesPage'; 
// import StudentRoute from './components/StudentRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* General Routes */}
            <Route path="/courses" element={<PrivateRoute><CourseList /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/courses/:courseId/lessons" element={<PrivateRoute><LessonPage /></PrivateRoute>} />

            {/* Admin Routes */}
            <Route path="/admin/users" element={<AdminRoute><UserList /></AdminRoute>} />
            
            {/* Instructor Routes */}
            <Route path="/instructor/courses/create" element={<InstructorRoute><CourseFormPage /></InstructorRoute>} />
            <Route path="/instructor/courses/:id/edit" element={<InstructorRoute><CourseFormPage /></InstructorRoute>} />

            {/* New Student Routes
            <Route path="/my-courses" element={<StudentRoute><EnrolledCoursesPage /></StudentRoute>} /> */}
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;