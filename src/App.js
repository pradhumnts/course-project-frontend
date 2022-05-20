import React, { useContext } from 'react';
import './App.css';
import Index from './routes/index'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Exam from "./routes/exam";
import QBank from './routes/Qbank';
import Categories from './routes/category';
import Pricing from './routes/pricing_';
import ScrollToTop from './components/ScrollToTop';
import Profile from './routes/profile';
import Login from './routes/login';
import Register from './routes/register';
import UserCourses from './routes/user-courses'
import { AuthProvider } from './contexts/JWT'
import useAuth from './hooks/useAuth';
import ThemeProvider from './theme';

function App() {
  const { isAuthenticated  } = useAuth()

  return (
    <React.Fragment>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              {!isAuthenticated && 
              (
                <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                </>
              )
              }
              <Route path="user/courses/" element={<UserCourses />} />
              <Route path="course/:id" element={<Exam />} />
              <Route path="course/:id/qbank" element={<QBank />} />
              <Route path="categories" element={<Categories />} />
              <Route path="pricing" element={<Pricing />} />
              
              <Route path="/profile" element={<Profile />} />
     
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
