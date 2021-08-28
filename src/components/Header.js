import logo from '../images/logo.svg';
import {Link, Route, Switch} from 'react-router-dom';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Mesto"/>
      <Switch>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">Регистрация</Link>
        </Route>
        <Route exact path="/">
          <div>
            <span className="header__email">{ email }</span>
            <button className="header__button" onClick={onSignOut}>Выйти</button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
