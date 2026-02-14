import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ReviewsPage from './pages/Reviews';
import AboutPage from './pages/About';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<ReviewsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
