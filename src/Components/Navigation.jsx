import React from 'react';
import './styles/Navigation.css';
import BurgerMenu from './BurgerMenu';
import logo320 from '../images/svg/logo320.svg';
import logo from '../images/svg/logo.svg';

function Navigation({ isLoggedIn, userData, signOut }) {
  return (
    <header className={'navigation'}>
      <picture className='logo'>
        <source srcSet={logo320} media='(max-width: 375px)' />
        <img src={logo} alt='Логотип' />
      </picture>
      <BurgerMenu
        userData={userData}
        signOut={signOut}
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
}

export default Navigation;
