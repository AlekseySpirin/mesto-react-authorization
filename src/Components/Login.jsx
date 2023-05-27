import React from 'react';
import './styles/Login.css'
// import {Link, useNavigate} from 'react-router-dom';
const Login = () => {
	return (
		<div className={'login'}>
			<p className={'login__welcome'}>Вход</p>
			<form className={'login__form'}>
				
				<input placeholder={'Email'} required id={'user-email'} name={'user-email'} type="text"/>
				<input placeholder={'Пароль'} required id={'password'} name={'password'} type={'password'}
				      />
				<div className="login__button-container">
					<button type="submit" className="login__link">Войти</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
