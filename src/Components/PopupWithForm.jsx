import Loading from './Loading';
import './styles/PopupWithForm.css';
import Popup from './Popup';

function PopupWithForm({
  title,
  name,
  submitButtonText,
  children,
  onSubmit,
  isLoading,
  isValid,
  isOpen,
  onClose,
}) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <form onSubmit={onSubmit} name={name} className='form' noValidate>
        <h2 className='form__title'>{title}</h2>
        {children}
        <button type='submit' className='pop-up__button' disabled={!isValid}>
          {isLoading ? <Loading /> : submitButtonText || 'Сохранить'}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
