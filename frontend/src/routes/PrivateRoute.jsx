// components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const { user } = useSelector((state)=> state.user)

  return user ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
