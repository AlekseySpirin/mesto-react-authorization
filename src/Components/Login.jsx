import React, {useState} from 'react';
import './styles/Login.css';

// import {Link, useNavigate} from 'react-router-dom';
const Login = ({handleLogin}) => {
	const [formValue, setFormValue] = useState({
		email: '',
		password: '',
	});
	
	const [errorMessage, setErrorMessage] = useState('');
	
	const handleChange = (e) => {
		const {name, value} = e.target;
		
		setFormValue({
			...formValue,
			[name]: value
		});
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const {email, password} = formValue;
		handleLogin(email, password).catch(err => setErrorMessage(err));
		
	};
	
	return (
		<div className={'login'}>
			<p className={'login__welcome'}>Вход</p>
			<p className={'login__error'}>{errorMessage}</p>
			<form onSubmit={handleSubmit} className={'login__form'}>
				<input placeholder={'Email'}
				       required
				       id={'email'}
				       name={'email'}
				       type="text"
				       onChange={handleChange}
				       value={formValue.email}
				/>
				
				<input placeholder={'Пароль'}
				       required
				       id={'password'}
				       name={'password'}
				       type={'password'}
				       onChange={handleChange}
				       value={formValue.password}
				/>
				<div className="login__button-container">
					<button type="submit"
					        className="login__link">Войти
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
