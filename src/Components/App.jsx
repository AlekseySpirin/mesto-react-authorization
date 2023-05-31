import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { authorize, getContent, register } from '../utils/auth';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirm from './PopupWithConfirm';
import './styles/App.css';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import NotFound from './NotFound';
import Loading from './Loading';

// eslint-disable-next-line func-names
const App = function () {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupWithConfirmOpen, setIsPopupWithConfirmOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  // const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen ||
  // isAddPlacePopupOpen || selectedCard || isImagePopupOpen;

  function getLoginUserDataFromToken(info) {
    getContent(info.token)
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          setUserData(data);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
  }

  const handleLogin = ({ email, password }, resetForm) =>
    authorize(email, password).then((data) => {
      localStorage.setItem('jwt', data.token);
      setIsLoggedIn(true);
      navigate('/cards');
      getLoginUserDataFromToken(data);
      resetForm();
    });

  useEffect(() => {
    Promise.all([api.getServerUserInfo(), api.getInitialCards()])
      .then(([info, card]) => {
        setCurrentUser(info);
        setCards(card);
      })
      .catch(console.error);
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function showResults() {
    setIsResultsOpen(true);
  }

  function successResult() {
    setIsSuccess(true);
  }

  const handleRegister = ({ email, password }, resetForm) =>
    register(email, password).then(() => {
      successResult();
      showResults();
      navigate('/login');
      resetForm();
    });

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    getContent(jwt)
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          navigate(location.pathname);
        } else {
          setIsLoggedIn(false);
        }
        setUserData(data);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isLoggedIn === null) {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Loading />;
  }

  function loadingContent() {
    setIsLoading(true);
  }

  function loadedContent() {
    setIsLoading(false);
  }

  // можно сделать универсальную функцию, которая принимает функцию запроса
  // function handleSubmit(request) {
  //   // изменяем текст кнопки до вызова запроса
  //   setIsLoading(true);
  //   request()
  //     // закрывать попап нужно только в `then`
  //     .then(closeAllPopups)
  //     // в каждом запросе нужно ловить ошибку
  //     // console.error обычно используется для логирования ошибок, если
  // никакой // другой обработки ошибки нет .catch(console.error) // в каждом
  // запросе в `finally` нужно возвращать обратно начальный текст // кнопки
  // .finally(() => setIsLoading(false)); }

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
      avatar: currentUser.avatar,
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

  function handleSubmit(request) {
    // изменяем текст кнопки до вызова запроса
    setIsLoading(true);
    request()
      // закрывать попап нужно только в `then`
      .then(closeAllPopups)
      // в каждом запросе нужно ловить ошибку
      // console.error обычно используется для логирования ошибок, если никакой
      // другой обработки ошибки нет
      .catch(console.error)
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст
      // кнопки
      .finally(() => setIsLoading(false));
  }

  // CARDS //
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete() {
    loadingContent();
    api
      // eslint-disable-next-line no-underscore-dangle
      .deleteCardServer(cardToDelete._id)
      .then(() => {
        // eslint-disable-next-line no-underscore-dangle
        const updatedCards = cards.filter((c) => c._id !== cardToDelete._id);
        setCards(updatedCards);
        setIsPopupWithConfirmOpen(false);
        setCardToDelete(null);
      })
      .catch(console.error)
      .finally(loadedContent);
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
    // eslint-disable-next-line no-underscore-dangle
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      // eslint-disable-next-line no-underscore-dangle
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // eslint-disable-next-line no-underscore-dangle
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch(console.error);
  }

  function handleUpdateUser({ name, about }) {
    loadingContent();
    api
      .editServerProfile({
        name,
        about,
      })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(loadedContent);
  }

  function handleUpdateAvatar({ avatar }, resetForm) {
    loadingContent();
    api
      .editAvatar({ avatar })
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
        resetForm({ link: '' }, {}, false);
      })
      .catch(console.error)
      .finally(loadedContent);
  }

  function handleAddPlace({ name, link }, resetForm) {
    loadingContent();
    api
      .addCardServer({
        name,
        link,
      })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        resetForm(
          {
            place: '',
            link: '',
          },
          {},
          false,
        );
      })
      .catch(console.error)
      .finally(loadedContent);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        userData={userData}
      />
      <InfoTooltip
        name={'result'}
        isSucces={isSuccess}
        isOpen={isResultsOpen}
        onClose={closeAllPopups}
      />
      <Routes>
        <Route
          path='/'
          element={
            isLoggedIn ? (
              <Navigate to='/cards' replace />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route
          path='/register'
          element={
            <Register
              handleRegister={handleRegister}
              showResults={showResults}
            />
          }
        />
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        <Route
          path='/cards'
          element={
            <ProtectedRouteElement
              element={Main}
              isLoggedIn={isLoggedIn}
              cards={cards}
              onCardLike={handleCardLike}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardDelete={cardDeleteClick}
            />
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <PopupWithConfirm
        isOpen={isPopupWithConfirmOpen}
        onSubmit={submitFormConfirmDelete}
        onClose={closeAllPopups}
        isLoading={isLoading}
      />
      <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
};

export default App;
