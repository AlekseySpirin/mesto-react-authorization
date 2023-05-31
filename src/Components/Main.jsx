import { useContext } from 'react';
import './styles/Main.css';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  onConfirm,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { avatar, name, about } = currentUser;
  return (
    <main className='main'>
      <section className='profile'>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type */}
        <button
          onClick={onEditAvatar}
          id='avatar'
          style={{ backgroundImage: `url(${avatar})` }}
          className='profile__avatar'
        />
        <div className='profile__desc'>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type */}
          <button
            onClick={onEditProfile}
            type='button'
            className='profile__edit-button'
          />
          <h1 className='profile__name'>{name}</h1>
          <p className='profile__info'>{about}</p>
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type */}
        <button
          onClick={onAddPlace}
          type='button'
          className='profile__add-button'
        />
      </section>
      <section className='places'>
        <ul className='cards'>
          {cards.map((card) => (
            <Card
              key={card._id}
              onCardLike={onCardLike}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onConfirm={onConfirm}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
