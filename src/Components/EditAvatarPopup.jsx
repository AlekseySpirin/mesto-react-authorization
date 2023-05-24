import {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
	
	const avatarRef = useRef(null);
	
	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar({avatar: avatarRef.current.value});
		
	}
	
	useEffect(() => {
		if (isOpen) {
			avatarRef.current.value = '';
		}
		
	}, [isOpen]);
	
	return (
		<PopupWithForm
			name={'update-avatar'}
			title={'Обновить аватар'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				id="link-avatar"
				ref={avatarRef}
				name="link"
				className="form__item form__item_el_link"
				type="url"
				placeholder="Ссылка на картинку"
				required
			/>
			<span className="form__item-error form__item-error_el_link"></span>
		</PopupWithForm>
	);
};

export default EditAvatarPopup;