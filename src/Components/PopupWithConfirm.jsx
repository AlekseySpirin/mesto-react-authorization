import React from 'react';
import PopupWithForm from "./PopupWithForm";

const PopupWithConfirm = ({isOpen, onClose, onSubmit}) => {
	
	function handleSubmit(e) {
		e.preventDefault();
		onSubmit();
	}
	
	return (
		<PopupWithForm
			name={'delete-card'}
			title={'Вы уверены?'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			submitButtonText={'Да'}/>
	);
};

export default PopupWithConfirm;