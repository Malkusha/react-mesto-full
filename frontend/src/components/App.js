import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import {api} from "../utils/api.js";
import * as auth from "../utils/auth.js"
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  
  function checkToken() {
    const token = localStorage.getItem("token");
    if ( token ) {
      auth.getContent(token)
      .then((data) => {
        if (!data) {
          return;
        }
        setEmail(data.email);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsLoggedIn(false);
        setEmail('');
      });}
  }

  useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      api.getProfileInfo()
      .then(({name, about, avatar, _id}) => {
        setCurrentUser({name, about, avatar, _id});
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
    }   
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards()
      .then((data) => {
        setCards(data.data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      }) 
    }     
  }, [isLoggedIn])

  function handleUpdateUser({name, about}) {
    api.setProfileInfo({name, about})
      .then((data) => setCurrentUser(data.data))
      .then(closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
    
  }

  function handleUpdateAvatar({avatar}) {
    api.setAvatar({avatar})
      .then((data) => setCurrentUser(data.data))
      .then(closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleAddPlaceSubmit(newCard) {
    api.loadNewCard(newCard)
      .then(( newCard ) => setCards([newCard.data, ...cards]))
      .then(closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);  
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i === currentUser._id);

    if (!isLiked) {
      api.addLike(card._id)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard.data : c));
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });    
    } else {
      api.removeLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) =>c._id === card._id ? newCard.data : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      }); 
    }    
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(setCards(cards.filter(item => item._id !== card._id)))
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      }); 
  }

  function handleLogin(email) {
    setIsLoggedIn(true);
    setEmail(email);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/signin');
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={email}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              element={Main} 
              isLoggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              setCards={setCards}
            />
          }/>
          <Route 
            path="/signup" 
            element={<Register
              onClose={closeAllPopups}
            />
          }/> 
          <Route 
            path="/signin" 
            element={<Login  
              handleLogin={handleLogin} 
              isLoggedIn={isLoggedIn} 
            />
          }/>  
        </Routes>
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit} 
        />
        <PopupWithForm
          popupName='delete'
          title='Вы уверены?'
          submitTitle='Да'
          onClose={closeAllPopups}  
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <Footer />  
      </CurrentUserContext.Provider>
  );
}

export default App;
