import '../index.css';
import Headerr from "./Header";
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
import FormValidator from "../utils/FormValidator";
import './styles/App.css';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import {
	Route,
	Routes,
	Navigate,
	useNavigate, useLocation,
} from 'react-router-dom';
import ProtectedRouteElement from "./ProtectedRoute";
import NotFound from "./NotFound";
import {authorize, getContent, register} from "../auth";
import Loading from "./Loading";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const [userData, setUserData] = useState(null);
	const location = useLocation()
	const navigate = useNavigate();
	
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
	const [isLoading, setIsLoading] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isResultsOpen, setIsResultsOpen] = useState(false);
	const handleLogin = (email, password) => {
		
		return authorize(email, password).then((data) => {
			
			
			
			console.log(data);
			localStorage.setItem('jwt', data.token);
			console.log(data.token);
			setIsLoggedIn(true);
			
			navigate('/cards');
			
		});
	};
	useEffect(() => {
		Promise.all([api.getServerUserInfo(), api.getInitialCards()])
			.then(([info, card]) => {
				setCurrentUser(info);
				setCards(card);
			})
			.catch(err => console.log(err));
	}, []);
	
	// POPUP //
	
	function handleEditAvatarClick() {
		// formValidators['update-avatar'].resetValidation();
		// formValidators['update-avatar'].disableSubmitButton();
		setIsEditAvatarPopupOpen(true);
		
	}
	
	function showResults(){
		setIsResultsOpen(true)
	}

	function successResult() {
		setIsSuccess(true);
	}
	
	const handleRegister = (password, email) => {
		return register(password, email)
			.then((data) => {
				console.log(data)
				successResult()
				showResults()
				navigate('/login');
			});
		
	};
	
	
	
	const checkToken = () => {
		const jwt = localStorage.getItem('jwt');
		getContent(jwt).then((data) => {
			if (data) {
				console.log(data)
				setIsLoggedIn(true);
				navigate(location.pathname);
			} else {
				setIsLoggedIn(false);
				
			}
			console.log(data);
			setUserData(data);
		}).catch((err) => {
			setIsLoggedIn(false);
			console.log(err)
		})
	};
	
	useEffect(() => {
		checkToken();
	}, []);
	
	if (isLoggedIn === null) {
		return (<Loading/>);
	}
	
	function disableSubmitBtn() {
		setIsButtonDisabled(true);
	}
	
	function enableSubmitBtn() {
		setIsButtonDisabled(false);
	}
	
	function loadingContent() {
		setIsLoading(true);
	}
	
	function loadedContent() {
		setIsLoading(false);
	}
	
	function handlePopupWithConfirmClick() {
		setIsPopupWithConfirmOpen(true);
	}
	
	function handleAddPlaceClick() {
		// formValidators['add-place'].resetValidation();
		setIsAddPlacePopupOpen(true);
	}
	
	function handleEditProfileClick() {
		// formValidators['edit-profile'].resetValidation();
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
		setIsResultsOpen(false);
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
	
	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		
		api.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			})
			.catch(err => console.log(err));
	}
	
	function handleCardDelete() {
		loadingContent();
		api.deleteCardServer(cardToDelete._id)
			
			.then(() => {
				const updatedCards = cards.filter((c) => c._id !== cardToDelete._id);
				setCards(updatedCards);
				setIsPopupWithConfirmOpen(false);
				setCardToDelete(null);
			})
			.catch(err => console.log(err))
			.finally(() => {loadedContent();});
	}
	
	// После сабмита формы, при повторном открытии окна кнопка сабмита снова
	// активна, не применяется  formValidators['name'].disableSubmitButton();
	// точнее кнопка становится неактивной и сразу активной.
	// Класс дизейбла кнопки включается и сразу отключается.
	// При закрытии на крестик, все отрабатывает нормально.
	
	function handleUpdateUser({name, about}) {
		// formValidators['edit-profile'].disableSubmitButton();
		loadingContent();
		api.editServerProfile({name, about}).then((userInfo) => {
			
			setCurrentUser(userInfo);
			closeAllPopups();
		}).catch((err) => {
			// formValidators['edit-profile'].enableSubmitButton();
			console.log(err);
		}).finally(() => {loadedContent();});
	}
	
	function handleUpdateAvatar({avatar}, resetForm) {
		disableSubmitBtn();
		loadingContent();
		api.editAvatar({avatar}).then((userAvatar) => {
			setCurrentUser(userAvatar);
			closeAllPopups();
			resetForm({ link: '' }, {}, false)
			disableSubmitBtn();
			
		}).catch((err) => {
			enableSubmitBtn();
			console.log(err);
		}).finally(() => {loadedContent();});
	}
	
	function handleAddPlace({name, link}, resetForm) {
		// formValidators['add-place'].disableSubmitButton();
		loadingContent();
		api.addCardServer({name, link}).then((newCard) => {
			setCards([newCard, ...cards]);
			closeAllPopups();
			resetForm({ place: '', link: ''}, {}, false)
		}).catch((err) => {
			// formValidators['add-place'].enableSubmitButton();
			console.log(err);
		}).finally(() => {loadedContent();});
	}
	

	
	return (
		
		<CurrentUserContext.Provider value={currentUser}>
			<Headerr setIsLoggedIn={setIsLoggedIn}  isLoggedIn={isLoggedIn} userData={userData}/>
			<InfoTooltip
				name={'result'}
				
				isSucces={isSuccess}
				isOpen={isResultsOpen}
				onClose={closeAllPopups}/>
			<Routes>
				<Route path="/" element={isLoggedIn ? <Navigate to="/cards" replace/> :
					<Navigate to="/login" replace/>}/>
				<Route path="/register"
				       element={<Register handleRegister={handleRegister} showResults={showResults}/>}/>
				<Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
				<Route path="/cards"
				       element={<ProtectedRouteElement
					       element={Main}
					       isLoggedIn={isLoggedIn}
					       cards={cards}
					       onCardLike={handleCardLike}
					       onCardClick={handleCardClick}
					       onEditProfile={handleEditProfileClick}
					       onAddPlace={handleAddPlaceClick}
					       onEditAvatar={handleEditAvatarClick}
					       onCardDelete={cardDeleteClick}
				       />}/>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
			<Footer/>
			<EditProfilePopup onUpdateUser={handleUpdateUser}
			                  isOpen={isEditProfilePopupOpen}
			                  onClose={closeAllPopups}
			                  isLoading={isLoading}/>
			<AddPlacePopup isOpen={isAddPlacePopupOpen}
			               onClose={closeAllPopups}
			               onAddPlace={handleAddPlace}
			               isLoading={isLoading}/>
			<EditAvatarPopup isOpen={isEditAvatarPopupOpen}
			                 onClose={closeAllPopups}
			                 onUpdateAvatar={handleUpdateAvatar}
			                 isLoading={isLoading}
			                 isButtonDisabled={isButtonDisabled}/>
			<PopupWithConfirm isOpen={isPopupWithConfirmOpen}
			                  onSubmit={submitFormConfirmDelete}
			                  onClose={closeAllPopups}
			                  isLoading={isLoading}/>
			<ImagePopup
				selectedCard={selectedCard}
				onClose={closeAllPopups}/>
		</CurrentUserContext.Provider>
	
	);
};

export default App;
