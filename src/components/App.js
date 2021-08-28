import React from 'react';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  React.useEffect(() => {
    api.getInitialData()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => console.log(err))
  }, []);

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  const handleCardDelete = card => {
    api.deleteCard(card._id).then(() => setCards(state => state.filter(c => c._id !== card._id)))
  }


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleUpdateUser = ({name, about}) => {
    api.editUserInfo(name, about)
      .then(newUserInfo => setCurrentUser(newUserInfo))
      .then(closeAllPopups)
      .catch(err => console.log(err))
  }

  const handleUpdateAvatar = (avatar) => {
    api.editUserAvatar(avatar)
      .then(avatar => setCurrentUser(user => {
        return {...user, ...avatar}
      }))
      .then(closeAllPopups)
      .catch(err => console.log(err))
  }

  const handleAddPlace = ({name, link}) => {
    api.setNewCard(name, link)
      .then(newCard => setCards([newCard, ...cards]))
      .then(closeAllPopups)
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header/>
          <Switch>
            <Route path="/sign-up">
              <Register name="register" title="Регистрация" buttonText="Зарегистрироваться" onSubmit={() => {}} />
            </Route>
            <Route path="/sign-in">
              <Login name="login" title="Вход" buttonText="Войти" onSubmit={() => {}} />
            </Route>
            <ProtectedRoute isLoggedIn={isLoggedIn} exact path="/">
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer/>
            </ProtectedRoute>
          </Switch>
        </div>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да"/>

        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={false} />

        {selectedCard && <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
