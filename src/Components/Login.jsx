import React from 'react';
import './styles/Login.css'
import {Link, useNavigate} from 'react-router-dom';
const Login = () => {
	return (
		<div className={'login'}>
			<p className={'login__welcome'}>Регистрация</p>
			<form className={'login__form'}>
				<label htmlFor={'user-email'}>
					Email
				</label>
				<input required id={'user-email'} name={'user-email'} type="text"/>
				<label htmlFor={'password'}>
					Пароль:
				</label>
				<input required id={'password'} name={'password'} type={'password'}
				       value={formValue.password} onChange={handleChange}/>
				<div className="login__button-container">
					<button type="submit" className="login__link">Войти</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
