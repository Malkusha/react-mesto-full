import logo from '../../src/images/Vector.svg';
import {NavLink, useLocation } from 'react-router-dom';

function Header({ email, onLogout }) {

  const location = useLocation();

  return (
    <>
      <header className="header">
        <img className="logo" src={logo}/>
        <ul className="header__info">
          {location.pathname === "/signin" && <li><NavLink className="header__link" to="/signup">Регистрация</NavLink></li>}
          {location.pathname === "/signup" && <li><NavLink className="header__link" to="/signin">Войти</NavLink></li>}
          {location.pathname === "/" &&  <li className="header__info">
            <span className="header__email">{email !== undefined ? email : ''}</span>
            <NavLink className="header__link" to="/signin" onClick={onLogout}>Выйти</NavLink>
          </li>}
        </ul>
        
     </header>
    </>
    
  )
}

export default Header;