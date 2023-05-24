import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {useEffect, useState} from "react";
import {api} from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirm from "./PopupWithConfirm";

const App = () => {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isPopupWithConfirmOpen, setIsPopupWithConfirmOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [currentUser, setCurrentUser] = useState({
		name: '',
		about: '',
		avatar: ''
	});
	const [cards, setCards] = useState([]);
	const [cardToDelete, setCardToDelete] = useState({});
	
	// POPUP //
	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}
	
	function handlePopupWithConfirmClick() {
		setIsPopupWithConfirmOpen(true);
	}
	
	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}
	
	function handleEditProfileClick() {
		setCurrentUser({
			name: currentUser.name,
			about: currentUser.about,
			avatar: currentUser.avatar
		});
		setIsEditProfilePopupOpen(true);
	}
	
	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsPopupWithConfirmOpen(false);
		setSelectedCard(null);
	}
	
	// CARDS //
	function handleCardClick(card) {
		setSelectedCard(card);
	}
	
	const submitFormConfirmDelete = (card) => {
		handleCardDelete(card);
	};
	
	const cardDeleteClick = (card) => {
		handlePopupWithConfirmClick();
		setCardToDelete(card);
	};
	
	// API //
	
	useEffect(() => {
		Promise.all([api.getServerUserInfo(), api.getInitialCards()])
			.then(([info, card]) => {
				setCurrentUser(info);
				setCards(card);
			})
			.catch(err => console.log(err));
	}, []);
	
	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		
		api.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			})
			.catch(err => console.log(err));
	}
	
	function handleCardDelete() {
		api.deleteCardServer(cardToDelete._id)
			.then(() => {
				const updatedCards = cards.filter((c) => c._id !== cardToDelete._id);
				setCards(updatedCards);
				setIsPopupWithConfirmOpen(false);
				setCardToDelete(null);
			})
			.catch(err => console.log(err));
	}
	
	function handleUpdateUser({name, about}) {
		api.editServerProfile({name, about}).then((userInfo) => {
			setCurrentUser(userInfo);
			closeAllPopups();
		}).catch(err => console.log(err));
	}
	
	function handleUpdateAvatar({avatar}) {
		api.editAvatar({avatar}).then((userAvatar) => {
			setCurrentUser(userAvatar);
			closeAllPopups();
		}).catch(err => console.log(err));
	}
	
	function handleAddPlace({name, link}) {
		api.addCardServer({name, link}).then((newCard) => {
			setCards([newCard, ...cards]);
			closeAllPopups();
		}).catch(err => console.log(err));
	}
	
	return (
		
		<CurrentUserContext.Provider value={currentUser}>
			<Header/>
			<Main
				cards={cards}
				onCardLike={handleCardLike}
				onCardClick={handleCardClick}
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onEditAvatar={handleEditAvatarClick}
				onCardDelete={cardDeleteClick}
				// onConfirm={cardDeleteClick}
			/>
			<Footer/>
			<EditProfilePopup onUpdateUser={handleUpdateUser}
			                  isOpen={isEditProfilePopupOpen}
			                  onClose={closeAllPopups}/>
			<AddPlacePopup isOpen={isAddPlacePopupOpen}
			               onClose={closeAllPopups}
			               onAddPlace={handleAddPlace}/>
			<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
			                 onUpdateAvatar={handleUpdateAvatar}/>
			<PopupWithConfirm isOpen={isPopupWithConfirmOpen}
			                  onSubmit={submitFormConfirmDelete}
			                  onClose={closeAllPopups}/>
			<ImagePopup
				selectedCard={selectedCard}
				onClose={closeAllPopups}/>
		</CurrentUserContext.Provider>
	
	);
};

export default App;
