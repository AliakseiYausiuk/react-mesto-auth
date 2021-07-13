import React, {useContext} from 'react';
import vector from '../images/Vector.svg';
import plus from '../images/plus.svg';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

const Main = ({cards, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace, onCardClick}) => {

  const currentUser = useContext(CurrentUserContext);
  
    return (
      <main className="main">
        <section className="profile">
        <div className="profile__avatar-hover">
        <img className="profile__avatar" src={currentUser ? currentUser.avatar : ''} alt="Аватар" onClick={onEditAvatar}/>
        </div>
        <div className="profile__list">
          <h1 className="profile__info">{currentUser ? currentUser.name : 'Жак-Ив Кусто'}</h1>
          <div>
            <button className="profile__edit-button" type="button" aria-label="btn-edit" onClick={onEditProfile}>
              <img src={vector} alt="Кнопка редактировать"/>
            </button>
          </div>
          <div>
            <p className="profile__text">{currentUser ? currentUser.about : 'Исследователь океана'}</p>
          </div>
      </div>
      <button className="profile__add-Button" type="button" aria-label="btn-add" onClick={onAddPlace}>
        <img className="profile__add-Btn-img" src={plus} alt="Кнопка плюс"/>
      </button>
        </section>
      <section className="elements">
      <ul className="cards">
        {cards.map(el => <Card key={el._id} card={el} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>)}
      </ul>
      </section>
      </main>
    )
}

export default Main

