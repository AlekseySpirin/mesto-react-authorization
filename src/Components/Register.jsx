import React, {useState} from 'react';
import './styles/Register.css';
import {useNavigate} from "react-router-dom";
import {register} from "../auth";

const Register = () => {
	
	const [formValue, setFormValue] = useState({
		email: '',
		password: '',
	});
	
	const [errorMessage, setErrorMessage] = useState('');
	
	const navigate = useNavigate();
	
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
		register(password, email)
			.then((data) => {
				console.log(data)
				navigate('/login')
			})
			.catch(err => setErrorMessage(err))
	};
	return (
		<div className={'register'}>
			<p className={'register__welcome'}>Регистрация</p>
			<p className={'register_error'}>{errorMessage}</p>
			<form onSubmit={handleSubmit} className={'register__form'}>
				<input placeholder={'Email'}
				       required
				       id={'email'}
				       name={'email'} type="text"
				       onChange={handleChange}
				       value={formValue.email}/>
				<input placeholder={'Пароль'}
				       required
				       id={'password'}
				       name={'password'}
				       type={'password'}
				       value={formValue.password}
				       onChange={handleChange}
				/>
				<div className="register__button-container">
					<button onSubmit={handleSubmit} type="submit" className="register__link">Зарегистрироваться
					</button>
				</div>
			</form>
			<div className="register__signin">
				<p>Уже зарегистрированы?</p>
				<p className="register__login-link">Войти</p>
			</div>
		</div>
	);
};

export default Register;