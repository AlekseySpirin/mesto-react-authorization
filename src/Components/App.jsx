import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { authorize, getContent, logout, register } from '../utils/auth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Api from '../utils/Api';
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
import Navigation from './Navigation';

function App() {
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
  const { REACT_APP_API_URL = 'https://api.mesto-spirin.nomoredomains.work' } =
    process.env;
  const api = new Api({
    url: REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  function getLoginUserDataFromToken() {
    getContent()
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

  const handleLogout = () => {
    logout().then((res) => console.log(res));
  };
  const handleLogin = ({ email, password }, resetForm) =>
    authorize(email, password).then((data) => {
      setIsLoggedIn(true);
      navigate('/cards');
      getLoginUserDataFromToken(data);
      resetForm();
    });

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getServerUserInfo(), api.getInitialCards()])
        .then(([info, card]) => {
          setCurrentUser(info);
          setCards(card);
          navigate('/cards');
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

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
    getContent()
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
    return <Loading />;
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
    setIsLoading(true);
    request()
      .then(closeAllPopups)

      .catch(console.error)

      .finally(() => setIsLoading(false));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete() {
    function makeRequest() {
      return api.deleteCardServer(cardToDelete._id).then(() => {
        const updatedCards = cards.filter((c) => c._id !== cardToDelete._id);
        setCards(updatedCards);
        setIsPopupWithConfirmOpen(false);
        setCardToDelete(null);
      });
    }

    handleSubmit(makeRequest);
  }

  const submitFormConfirmDelete = (card) => {
    handleCardDelete(card);
  };

  const cardDeleteClick = (card) => {
    handlePopupWithConfirmClick();
    setCardToDelete(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    function makeRequest() {
      return api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      });
    }

    handleSubmit(makeRequest);
  }

  function handleUpdateUser({ name, about }) {
    function makeRequest() {
      return api
        .editServerProfile({
          name,
          about,
        })
        .then(setCurrentUser);
    }

    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({ avatar }) {
    function makeRequest() {
      return api.editAvatar({ avatar }).then(setCurrentUser);
    }

    handleSubmit(makeRequest);
  }

  function signOut() {
    setIsLoggedIn(false);
    handleLogout();
  }

  function handleAddPlace({ name, link }) {
    function makeRequest() {
      return api
        .addCardServer({
          name,
          link,
        })
        .then((newCard) => {
          setCards([newCard, ...cards]);
        });
    }

    handleSubmit(makeRequest);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Navigation
        signOut={signOut}
        isLoggedIn={isLoggedIn}
        userData={userData}
      />
      <Header
        signOut={signOut}
        handleLogout={handleLogout}
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
        <Route
          path='/login'
          element={
            <Login handleLogin={handleLogin} showResults={showResults} />
          }
        />
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
}

export default App;
