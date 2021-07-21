import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js'
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import * as Auth from '../utils/Auth.js';
import regIsFine from '../images/UnionTrue.svg';
import regIsFailed from '../images/UnionFalse.svg';



function App() {

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();


  useEffect(() => {
    api.getFullInfo()
    .then(([arrCards, userData]) => {
      setCurrentUser(userData);
      setCards(arrCards);
    })
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // токен
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch(err => console.log(err));
    }
  }, [history]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(err => console.log(err));
    
  } 

  const handleCardDelete = (card) => {

    api.deleteCard(card._id)
    .then(res => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch(err => console.log(err));
  }


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);

  const [message, setMessage] = useState({});
  const escapeHtml = require('escape-html');
  const [email, setEmail] = useState('');


  const [selectedCard, setSelectedCard] = useState(null);


  // изменение сотояния при клике (открывает попап)
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  

  // изменение сотояния при клике (открывает попап)
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  // изменение сотояния при клике (открывает попап)
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  // // изменение сотояния при клике (закрывает попапы)
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltipOpen(false)

    setSelectedCard(null);
  }
  
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  
  const handleUpdateUser = (data) => {
    api.userEdit(data)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  const handleUpdateAvatar = (data) => {
    api.upgradeAvatar(data.avatar)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }
  
  const handleAddPlaceSubmit = (newCard) => {
    api.newCard(newCard)
    .then(res => {
      setCards([res, ...cards]); 
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  function handleInfoTooltipContent({iconPath, text}) {
    setMessage({ iconPath, text })
  }

  const handlerInfoTooltipOpen = () => {
    setInfoTooltipOpen(true)
  }
  

  function registration(email, password) {
    Auth.register(escapeHtml(email), password).then((res) => {
      if(res.status === 201){
        handleInfoTooltipContent({iconPath: regIsFine, text: 'Вы успешно зарегистрировались!'})
        handlerInfoTooltipOpen();
        /// редирект на стр входа для повтоного ввода
        history.push("/sign-in");
        // свайпнули модалку через 1 сек
        setTimeout(closeAllPopups, 1000);
      }
    }).catch((err)=> {
      handleInfoTooltipContent({iconPath: regIsFailed, text: 'Что-то пошло не так! Попробуйте ещё раз.'})
      handlerInfoTooltipOpen();
      setTimeout(closeAllPopups, 2500);
      console.log(err)
    })
  }

   // Авторизация 
   function authorization(email, password) {
    Auth.authorize(escapeHtml(email), password )
    .then((data) => {
      if (!data) {
        throw new Error('Произошла ошибка');
      }
      Auth.getContent(data)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
        })
        .then(()=> {
          handleInfoTooltipContent({iconPath: regIsFine, text: 'Вы успешно авторизовались!'})
          handlerInfoTooltipOpen();
          // редирект на главную
          history.push("/");
          //свайпнули модалку после редиректа через 1сек
          setTimeout(closeAllPopups, 1000);
        })
        
    }).catch((err) => {
      handleInfoTooltipContent({iconPath: regIsFailed, text: 'Что то пошло не так!'})
      handlerInfoTooltipOpen();
      console.log(err)
    })
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail('');
    history.push('/sign-in');
  }
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
     <Header email={email} handleSignOut={handleSignOut} loggedIn={loggedIn}/>
     <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
     <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
     <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
     <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
     <InfoTooltip isOpen={infoTooltipOpen} onClose={closeAllPopups} message={message}/>
     <Switch>
       <ProtectedRoute 
         exact
         path='/' 
         loggedIn={loggedIn} 
         component={Main}
         cards={cards} 
         onCardLike={handleCardLike} 
         onCardDelete={handleCardDelete} 
         onEditAvatar={handleEditAvatarClick} 
         onEditProfile={handleEditProfileClick} 
         onAddPlace={handleAddPlaceClick} 
         onCardClick={handleCardClick}
       />
       <Route path='/sign-up'>
         <Register registration={registration}/>
       </Route>
       <Route path='/sign-in'>
         <Login authorization={authorization}/>
       </Route>
       <Route exact path="/">
         {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
       </Route>
     </Switch>
     <Footer/>
    </CurrentUserContext.Provider>
  );
}

export default App;
