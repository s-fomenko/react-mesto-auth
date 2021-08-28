import React from 'react';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';

function Register({...props}) {
  return (
    <>
      <AuthForm {...props} />
      <div className="register">
        <span>Уже зарегистрированы? </span>
        <Link className="register__link" to="/sign-in">Войти</Link>
      </div>
    </>
  );
}

export default Register;
