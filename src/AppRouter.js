import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LayoutLogin from './layouts/LayoutLogin';
import Layout from './layouts/layout';


import DataProduct from './Dataproduct';
import LogActivity from './LogActivity';
import LogUploadFile from './LogUploadFile';
import BebanHarian from './BebanHarian';
import EditUserSettings from './UserSettings';
import Login from './Login';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/data-product" />} />
          <Route path="data-product" element={<DataProduct />} />
          <Route path="log-activity" element={<LogActivity />} />
          <Route path="log-upload-file" element={<LogUploadFile />} />
          <Route path="beban-harian" element={<BebanHarian />} />
          <Route path="user-settings" element={<EditUserSettings />} />
        </Route>
        <Route path="/login" element={<LayoutLogin />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
