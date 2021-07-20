import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';


export default function Header({loggedIn, email, handleSignOut}) {
  const { pathname } = useLocation();
  const text = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const linkRoute = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;
    return (
      <header className="header">
        <img className="logo" src={logo} alt="Логотип"/>
        <div className="header__login">
        {loggedIn ? (
          <>
            <p className="header__email">{email}</p>
            <Link className="header__signout" to="" onClick={handleSignOut}>Выйти</Link>
          </>) : (<Link to={linkRoute} className="header__link">{text}</Link>)
        }
      </div>
      </header>
    )
}