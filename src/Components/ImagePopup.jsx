import './styles/ImagePopup.css';
import Popup from './Popup';

function ImagePopup({ selectedCard, onClose }) {
  return (
    <Popup name={'img'} selectedCard={selectedCard} onClose={onClose}>
      <img
        className='pop-up__img'
        src={selectedCard?.link}
        alt={selectedCard?.name}
      />
      <h2 className='pop-up__title-img'>{selectedCard?.name}</h2>
    </Popup>
  );
}

export default ImagePopup;
