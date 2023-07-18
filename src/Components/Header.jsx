import { NavLink, useLocation } from 'react-router-dom';
import logo320 from '../images/svg/logo320.svg';
import logo from '../images/svg/logo.svg';
import './styles/Header.css';

function Header({ isLoggedIn, userData, setIsLoggedIn, handleLogout }) {
  const location = useLocation();

  function signOut() {
    setIsLoggedIn(false);
    handleLogout();
  }

  return (
    <header className='header'>
      <picture className='logo'>
        <source srcSet={logo320} media='(max-width: 375px)' />
        <img src={logo} alt='Логотип' />
      </picture>
      <nav className='menu'>
        {isLoggedIn ? (
          <NavLink className={'user__link'} to='#'>
            <p className={'user__email'}> {userData?.email}</p>
          </NavLink>
        ) : (
          ''
        )}
        {location.pathname === '/register' && (
          <NavLink to='/login' className={'menu__item'}>
            {isLoggedIn ? (
              <button
                type={'button'}
                onClick={signOut}
                className={'menu__exit'}
              >
                Выйти
              </button>
            ) : (
              'Войти'
            )}
          </NavLink>
        )}
        {location.pathname === '/login' && (
          <NavLink to='/register' className={'menu__item'}>
            Регистрация
          </NavLink>
        )}
        {isLoggedIn ? (
          <NavLink to='/login' className={'menu__item'}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <p onClick={signOut} className={'menu__exit'}>
              Выйти
            </p>
          </NavLink>
        ) : (
          ''
        )}
      </nav>
    </header>
  );
}

export default Header;
