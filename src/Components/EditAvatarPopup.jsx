import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import './styles/EditAvatarPopup.css';
import useFormAndValidation from '../utils/hooks/useFormAndValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({ link: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({ avatar: values.link }, resetForm);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm({ link: '' }, {}, false);
    }
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name={'update-avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
    >
      <input
        id='link-avatar'
        // ref={avatarRef}
        name='link'
        className='form__item form__item_el_link'
        type='url'
        onChange={handleChange}
        placeholder='Ссылка на картинку'
        value={values.link}
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

export default EditAvatarPopup;
