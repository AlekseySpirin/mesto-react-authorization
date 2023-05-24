import {useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
	
	const currentUser = useContext(CurrentUserContext);
	const isOwn = card.owner._id === currentUser._id;
	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (
		`card__like ${isLiked && 'card__like_active'}`
	);
	
	function handleClick() {
		onCardClick(card);
	}
	
	function handleLikeClick() {
		onCardLike(card);
	}
	
	const handleCardDelete = () => {
		onCardDelete(card);
	};
	
	return (<li className="card" key={card._id}>
		<img className="card__img" src={card.link} alt={card.name}
		     onClick={handleClick}/>
		<h2 className="card__title">{card.name}</h2>
		<div className="card__likes-container">
			<button onClick={handleLikeClick} type="button"
			        className={cardLikeButtonClassName}></button>
			<p className="card__like_el_count">{card.likes.length}</p>
		</div>
		{isOwn && <button onClick={handleCardDelete} className="card__trash"/>}
	</li>);
}

export default Card;