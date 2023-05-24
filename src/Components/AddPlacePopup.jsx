import {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {
	const [values, setValues] = useState({name: '', link: ''});
	// const [nameCard, setNameCard] = useState('');
	// const [linkCard, setLinkCard] = useState('');
	
	// function handleChangeNameCard(e) {
	// 	setNameCard(e.target.value);
	// }
	//
	// function handleChangeLinkCard(e) {
	// 	setLinkCard(e.target.value);
	// }
	
	useEffect(() => {
		if (isOpen) {
			setValues({name: '', link: ''});
		}
		
	}, [isOpen]);
	
	function handleAddPlaceSubmit(e) {
		e.preventDefault();
		onAddPlace({name: values.name, link: values.link});
		
	}
	
	return (
		<PopupWithForm
			name={'add-place'}
			title={'Новое место'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleAddPlaceSubmit}
			submitButtonText={'Создать'}>
			<input
				id="place"
				name="place"
				value={values.name}
				onChange={(e) => setValues({...values, name: e.target.value})}
				className="form__item form__item_el_name"
				type="text"
				placeholder="Название"
				minLength="2"
				maxLength="30"
				required
			/>
			<span className="form__item-error form__item-error_el_place"></span>
			<input
				id="link"
				name="link"
				value={values.link}
				onChange={(e) => setValues({...values, link: e.target.value})}
				className="form__item form__item_el_link"
				type="url"
				placeholder="Ссылка на картинку"
				required
			/>
			<span className="form__item-error form__item-error_el_link"></span>
		</PopupWithForm>
	);
};

export default AddPlacePopup;