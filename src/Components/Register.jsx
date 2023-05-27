import React from 'react';
import './styles/Register.css';

const Register = () => {
	// const navigate = useNavigate()
	//
	// const handleChange = (e) => {
	// 	const {name, value} = e.target;
		
	// 	setFormValue({
	// 		...formValue,
	// 		[name]: value
	// 	});
	// }
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (formValue.password === formValue.confirmPassword){
	// 		auth.register(formValue.username, formValue.password, formValue.email).then((res) => {
	// 				navigate('/login', {replace: true});
	// 			}
	// 		);
	// 	}
	// }
	return (
		<div className={'register'}>
			<p className={'register__welcome'}>Регистрация</p>
			<form className={'register__form'} >
				<input placeholder={'Email'} required id={'user-email'}
				       name={'user-email'} type="text" />
				<input placeholder={'Пароль'} required id={'password'} name={'password'}
				       type={'password'}
				       
				/>
				<div className="register__button-container">
					<button type="submit" className="register__link">Зарегистрироваться
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