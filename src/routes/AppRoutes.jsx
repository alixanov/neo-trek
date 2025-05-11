import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Treker from '../components/treker/Treker';

const AppRoutes = () => {
  return (
    <Routes basename={"/"} >
      <Route path="/" element={<Treker />} />
    </Routes>
  );
};

export default AppRoutes;