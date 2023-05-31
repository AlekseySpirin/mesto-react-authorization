import React from 'react';
import PopupWithForm from './PopupWithForm';
import './styles/PopupWithConfirm.css';
import useFormAndValidation from '../utils/hooks/useFormAndValidation';

function PopupWithConfirm({ isOpen, onClose, onSubmit, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  const { isValid } = useFormAndValidation();
  return (
    <PopupWithForm
      name={'delete-card'}
      title={'Вы уверены?'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText={'Да'}
      isValid={isValid}
    />
  );
}

export default PopupWithConfirm;
