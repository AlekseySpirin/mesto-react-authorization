import React, { useEffect, useState } from 'react';
import './styles/BurgerMenu.css';
import { NavLink, useLocation } from 'react-router-dom';

function BurgerMenu({ isLoggedIn, signOut, userData }) {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    setMenuOpen(false); // Закрываем меню при каждом изменении маршрута
  }, [location.pathname]);

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type='button'
        className={`burger-menu__button ${
          isMenuOpen ? 'burger-menu__button_active' : ''
        }`}
        onClick={toggleMenu}
      />
      <nav className={`burger-menu ${isMenuOpen ? 'burger-menu_open' : ''}`}>
        <div className='burger-menu__content'>
          <ul className='burger-menu__list'>
            <li className='burger-menu__item'>
              {isLoggedIn ? (
                <NavLink className='burger-menu__link' to='#'>
                  <p className='user__email'>{userData?.email}</p>
                </NavLink>
              ) : (
                ''
              )}
            </li>
            <li className='burger-menu__item'>
              {!isLoggedIn && location.pathname === '/register' && (
                <NavLink to='/login' className='burger-menu__link'>
                  Войти
                </NavLink>
              )}
            </li>
            <li className='burger-menu__item'>
              {!isLoggedIn && location.pathname === '/login' && (
                <NavLink to='/register' className='burger-menu__link'>
                  Регистрация
                </NavLink>
              )}
            </li>
          </ul>
          {isLoggedIn ? (
            <NavLink
              onClick={signOut}
              to='/login'
              className='burger-menu__item'
            >
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <p className='burger-menu__exit'>Выйти</p>
            </NavLink>
          ) : (
            ''
          )}
        </div>
      </nav>
    </div>
  );
}

export default BurgerMenu;
