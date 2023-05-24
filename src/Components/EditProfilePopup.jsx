import {useContext, useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
	
	const currentUser = useContext(CurrentUserContext);
	
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	
	useEffect(() => {
		if (isOpen) {
			setName(currentUser.name);
			setDescription(currentUser.about);
		}
	}, [isOpen, currentUser.name, currentUser.about]);
	
	function handleChangeName(e) {
		setName(e.target.value);
		
	}
	
	function handleChangeDescription(e) {
		
		setDescription(e.target.value);
	}
	
	function handleSubmit(e) {
		e.preventDefault();
		
		onUpdateUser({name, about: description});
	}
	
	return (
		<PopupWithForm
			name={'edit-profile'}
			title={'Редактировать профиль'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				name="name"
				value={name}
				onChange={handleChangeName}
				className="form__item form__item_el_name"
				placeholder="Имя"
				type="text"
				id="name"
				minLength="2"
				maxLength="40"
				required
			/>
			<span className="form__item-error form__item-error_el_name"></span>
			<input
				name="info"
				value={description}
				onChange={handleChangeDescription}
				placeholder="Вид деятельности"
				className="form__item form__item_el_info"
				type="text"
				id="info"
				minLength="2"
				maxLength="200"
				required
			/>
			<span className="form__item-error form__item-error_el_info"></span>
		</PopupWithForm>
	);
};

export default EditProfilePopup;