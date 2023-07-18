import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import './styles/Card.css';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const { _id } = currentUser;
  const isOwn = (card.owner?._id || card.owner) === _id;
  const isLiked = card.likes?.some((i) => i._id === _id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && 'card__like_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  const handleCardDelete = () => {
    onCardDelete(card);
  };

  return (
    <li className='card'>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <img
        className='card__img'
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <h2 className='card__title'>{card.name}</h2>
      <div className='card__likes-container'>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          onClick={handleLikeClick}
          type='button'
          className={cardLikeButtonClassName}
        />
        <p className='card__like_el_count'>{card.likes.length}</p>
      </div>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type */}
      {isOwn && <button onClick={handleCardDelete} className='card__trash' />}
    </li>
  );
}

export default Card;
