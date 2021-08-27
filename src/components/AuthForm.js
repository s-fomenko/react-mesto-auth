import React from 'react';

function AuthForm({ name, title, buttonText, onSubmit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = e => setEmail(e.target.value);
  const handleChangePassword = e => setPassword(e.target.value);

  return (
    <form className="auth-form" action="#" name={name} onSubmit={onSubmit}>
      <div className="auth-form__wrapper">
        <h2 className="auth-form__title">{title}</h2>
        <input className="auth-form__input" id="email" type="email" name="email" placeholder="Email" required value={email || ''} onChange={handleChangeEmail} />
        <input className="auth-form__input" id="password" type="password" name="password" placeholder="Пароль" required value={password || ''} onChange={handleChangePassword} />
        <button className="auth-form__button" type="submit">
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
