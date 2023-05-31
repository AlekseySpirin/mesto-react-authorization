import React, { useState } from 'react';
import './styles/Register.css';
import { NavLink } from 'react-router-dom';
import useFormAndValidation from '../utils/hooks/useFormAndValidation';

function Register({ handleRegister, showResults }) {
  const { values, handleChange, errors, resetForm } = useFormAndValidation({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegister(
      {
        email: values.email,
        password: values.password,
      },
      resetForm,
    ).catch((err) => {
      setErrorMessage(err);
      showResults();
    });
  };
  return (
    <div className={'register'}>
      <h2 className={'register__welcome'}>Регистрация</h2>
      <p className={'register__error'}>{errorMessage}</p>
      <form onSubmit={handleSubmit} className={'register__form'} noValidate>
        <input
          placeholder={'Email'}
          required
          id={'email'}
          name={'email'}
          type='email'
          minLength='2'
          maxLength='30'
          onChange={handleChange}
          value={values.email}
        />
        {errors.email && (
          <span className='form__item-error form__item-error_el_login'>
            {errors.email}
          </span>
        )}
        <input
          placeholder={'Пароль'}
          required
          id={'password'}
          name={'password'}
          type={'password'}
          minLength='2'
          maxLength='30'
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className='form__item-error form__item-error_el_place'>
            {errors.password}
          </span>
        )}
        <div className='register__button-container'>
          <button type='submit' className='register__link'>
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className='register__signin'>
        <p>Уже зарегистрированы?</p>
        <NavLink className='register__login-link' to='/login'>
          <p>Войти</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Register;
