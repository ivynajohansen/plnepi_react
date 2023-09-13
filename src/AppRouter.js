import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LayoutLogin from './layouts/layoutlogin';
import Layout from './layouts/layout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
            path="/"
            element={<Navigate to="/data-product" />}
        />
        <Route 
            exact path="/data-product"
            element={<Layout pageName="/data-product" />} />
        <Route 
            exact path="/log-activity" 
            element={<Layout pageName="/log-activity" />} />
        <Route 
            exact path="/log-upload-file" 
            element={<Layout pageName="/log-upload-file" />} />
        <Route 
            exact path="/beban-harian" 
            element={<Layout pageName="/beban-harian" />} />
        <Route
            exact path="/login"
            element={<LayoutLogin pageName="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
