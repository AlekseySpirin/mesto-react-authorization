import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import './styles/EditProfilePopup.css';
import useFormAndValidation from '../utils/hooks/useFormAndValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      name: '',
      info: '',
    });
  const { name, about } = currentUser;
  useEffect(() => {
    if (isOpen) {
      resetForm(
        {
          name,
          info: about,
        },
        {},
        false,
      );
    }
  }, [about, name, isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.info,
    });
  }

  return (
    <PopupWithForm
      name={'edit-profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
    >
      <input
        name='name'
        value={values.name}
        onChange={handleChange}
        className='form__item form__item_el_name'
        placeholder='Имя'
        type='text'
        id='name'
        minLength='2'
        maxLength='40'
        required
      />
      {errors.name && (
        <span className='form__item-error form__item-error_el_name'>
          {errors.name}
        </span>
      )}
      <input
        name='info'
        value={values.info}
        onChange={handleChange}
        placeholder='Вид деятельности'
        className='form__item form__item_el_info'
        type='text'
        id='info'
        minLength='2'
        maxLength='200'
        required
      />
      {errors.info && (
        <span className='form__item-error form__item-error_el_info'>
          {errors.info}
        </span>
      )}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
