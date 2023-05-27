export default class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButton = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.form__item-error_el_${inputElement.name}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.form__item-error_el_${inputElement.name}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  };
  enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._inactiveButton);
    this._buttonElement.removeAttribute('disabled');
  };
  disableSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButton);
    this._buttonElement.setAttribute('disabled', 'disabled');
  };

  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        evt.preventDefault();

        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
