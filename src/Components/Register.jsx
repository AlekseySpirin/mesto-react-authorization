import React, {useState} from 'react';
import './styles/Register.css';


const Register = ({handleRegister}) => {
	
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
		handleRegister(email, password).catch(err => setErrorMessage(err))
	};
	return (
		<div className={'register'}>
			<p className={'register__welcome'}>Регистрация</p>
			<p className={'register__error'}>{errorMessage}</p>
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