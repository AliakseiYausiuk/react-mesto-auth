import React, {useContext} from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {

    const currentUser = useContext(CurrentUserContext);

    function handleClick(card) {
        onCardClick(card);
      }  

    const handleLikeClick  = (card) => {
        onCardLike(card);
    }

    const handleDeleteClick = (card) => {
        onCardDelete(card);
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = isOwn ? 'cards__btn-delete' : ''; 

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName =  isLiked ? 'cards__like cards__like_active' : 'cards__like';
    

    return (
        <li id={card._id} className="cards__card">
            {isOwn && <button className={cardDeleteButtonClassName} type="button" aria-label="btn-delete" onClick={() => handleDeleteClick(card)}></button>}
            <figure className="cards__list">
            <img className="cards__foto" src={card.link} alt={card.name} onClick={() => handleClick(card)}/>
            <figcaption className="cards__text">
                {card.name}
            </figcaption>
            <ul className="cards__item">
                <li>
                  <button className={cardLikeButtonClassName} type="button" aria-label="btn-like" onClick={() => handleLikeClick(card)}></button>
                </li>
                <li>
                    <span className="cards__like-number">{card.likes.length}</span>
                </li>
            </ul>
            </figure>
        </li>
    )
}

export default Card
