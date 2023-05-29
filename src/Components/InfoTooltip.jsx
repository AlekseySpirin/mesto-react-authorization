import React from 'react';
import './styles/Result.css';
import successImg from '../images/svg/Success.svg';
import failImg from '../images/svg/Fail.svg';

const InfoTooltip = ({name, isOpen, isSucces, onClose}) => {
	return (
		<div className={`pop-up  ${isOpen ? 'pop-up_active' : ''}`}>
			<div className="pop-up__container">
				<div className={'result'}>
					<img className={'result__img'}
					     src={isSucces ? successImg : failImg}
					     alt={isSucces ? 'Success' : 'Fail'}/>
					<p
						className={'result__text'}>{
						isSucces
							? 'Вы успешно зарегистрировались'
							: 'Что-то пошло не так! Попробуйте ещё раз.'
					}</p>
				</div>
				<button onClick={onClose} type="button"
				        className={`pop-up__close pop-up__close_place_${name}`}></button>
			</div>
		</div>
	);
};

export default InfoTooltip;