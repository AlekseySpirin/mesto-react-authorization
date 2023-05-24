import {useContext} from "react";

import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
	              onEditProfile,
	              onAddPlace,
	              onEditAvatar,
	              onCardClick,
	              onCardLike,
	              onCardDelete,
	              cards,
	              onConfirm
              }) {
	
	const currentUser = useContext(CurrentUserContext);
	
	return (
		<main className="main">
			<section className="profile">
				<button onClick={onEditAvatar} id="avatar"
				        style={{backgroundImage: `url(${currentUser.avatar})`}}
				        className="profile__avatar"></button>
				<div className="profile__desc">
					<button onClick={onEditProfile} type="button"
					        className="profile__edit-button"></button>
					<h1 className="profile__name">{currentUser.name}</h1>
					<p className="profile__info">{currentUser.about}</p>
				</div>
				<button onClick={onAddPlace} type="button"
				        className="profile__add-button"></button>
			</section>
			<section className="places">
				<ul className="cards">
					{cards.map((card) => (
						<Card key={card._id}
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