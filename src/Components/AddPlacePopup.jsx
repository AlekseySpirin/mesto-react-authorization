import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import './styles/AddPlacePopup.css';
import useFormAndValidation from '../utils/hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      place: '',
      link: '',
    });

  useEffect(() => {
    if (isOpen) {
      resetForm(
        {
          place: '',
          link: '',
        },
        {},
        false,
      );
    }
  }, [isOpen, resetForm]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace(
      {
        name: values.place,
        link: values.link,
      },
      resetForm,
    );
  }

  return (
    <PopupWithForm
      name={'add-place'}
      title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      isLoading={isLoading}
      submitButtonText={'Создать'}
      isValid={isValid}
    >
      <input
        id='place'
        name='place'
        value={values.place}
        onChange={handleChange}
        className='form__item form__item_el_name'
        type='text'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
      />
      {errors.place && (
        <span className='form__item-error form__item-error_el_place'>
          {errors.place}
        </span>
      )}
      <input
        id='link'
        name='link'
        value={values.link}
        onChange={handleChange}
        className='form__item form__item_el_link'
        type='url'
        placeholder='Ссылка на картинку'
        required
      />
      {errors.link && (
        <span className='form__item-error form__item-error_el_link'>
          {errors.link}
        </span>
      )}
    </PopupWithForm>
  );
}

export default AddPlacePopup;
