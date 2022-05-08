import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Exam from "./routes/exam";
import QBank from './routes/Qbank';
import Categories from './routes/category';
import NotFoundPage from './routes/404'
import Pricing from './routes/pricing';
import ScrollToTop from './components/ScrollToTop';
import Profile from './routes/profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="course/:id" element={<Exam />} />
        <Route path="course/:id/qbank" element={<QBank />} />
        <Route path="categories" element={<Categories />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
