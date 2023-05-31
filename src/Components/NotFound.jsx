import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NotFound.css';

function NotFound() {
  return (
    <div className={'not-found'}>
      <h1 className={'not-found__error'}>
        <span className={'not-found__error_color_red'}>404</span> : Страница не
        найдена
      </h1>
      <p className={'not-found__text'}>
        Извините, но такой страницы не существует.
      </p>
      <Link className={'not-found__link'} to='/'>
        Вернуться на главную страницу
      </Link>
    </div>
  );
}

export default NotFound;
