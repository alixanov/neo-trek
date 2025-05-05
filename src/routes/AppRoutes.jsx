import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Treker from '../components/treker/Treker';
import About from '../components/about/About';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Treker />} />
      {/* <Route path="/profile/:id" element={<About />} /> */}
    </Routes>
  );
};

export default AppRoutes;