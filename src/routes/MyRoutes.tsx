import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/home';
import Login from '../components/login';

const MyRoutes = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
  </Routes>
);

export default MyRoutes;
