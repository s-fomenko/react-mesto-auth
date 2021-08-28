import React from 'react';
import {Redirect, Route} from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, ...props }) {

  return isLoggedIn ? <Route {...props} /> : <Redirect to="/sign-in" />;
}

export default ProtectedRoute;
