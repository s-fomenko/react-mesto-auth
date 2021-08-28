import React from 'react';
import AuthForm from './AuthForm';

function Login({...props}) {
  return (
    <AuthForm {...props} />
  );
}

export default Login;
