function PopupWithForm({
	                       title,
	                       name,
	                       submitButtonText,
	                       children,
	                       isOpen,
	                       onClose,
	                       onSubmit
                       }) {
	
	return (
		<div className={`pop-up  ${isOpen ? 'pop-up_active' : ''}`}>
			<div className="pop-up__container">
				<form onSubmit={onSubmit} name={name} action="#"
				      className="form" noValidate>
					<h2 className="form__title">{title}</h2>
					{children}
					<button type="submit"
					        className="pop-up__button"
					>{submitButtonText || 'Сохранить'}</button>
				</form>
				<button onClick={onClose} type="button"
				        className={`pop-up__close pop-up__close_place_${name}`}></button>
			</div>
		</div>
	);
	
}

export default PopupWithForm;