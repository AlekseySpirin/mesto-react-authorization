import React, { useState } from 'react';
import './styles/Login.css';
import useFormAndValidation from '../utils/hooks/useFormAndValidation';

function Login({ handleLogin }) {
  const { values, handleChange, errors, resetForm } = useFormAndValidation({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(
      {
        email: values.email,
        password: values.password,
      },
      resetForm,
    ).catch((err) => setErrorMessage(err));
  };

  return (
    <div className={'login'}>
      <h2 className={'login__welcome'}>Вход</h2>
      <p className={'login__error'}>{errorMessage}</p>
      <form onSubmit={handleSubmit} className={'login__form'} noValidate>
        <input
          placeholder='Email'
          required
          id='email'
          name='email'
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
          id='password'
          name='password'
          type='password'
          minLength='2'
          maxLength='30'
          onChange={handleChange}
          value={values.password}
        />
        {errors.password && (
          <span className='form__item-error form__item-error_el_place'>
            {errors.password}
          </span>
        )}
        <div className='login__button-container'>
          <button type='submit' className='login__link'>
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
