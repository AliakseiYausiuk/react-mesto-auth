import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');

    const [description, setDescription] = useState('');

    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]); 

    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        });
    }
    

    return (
      <PopupWithForm title='Редактировать профиль' name='profile-popup' textBtn='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <input id='nameInput' type="text" className="pop-up__text" value={name || ''} onChange={handleChangeName} name="content-name" placeholder="Ваше имя" minLength="2" maxLength="40"  required/>
        <span id="nameInput-error" className="pop-up__span-error"></span>
        <input id='jobInput' type="text" className="pop-up__text" value={description || ''} onChange={handleChangeDescription} name="content-job" placeholder="О себе" minLength="2" maxLength="200" required/>
        <span id="jobInput-error" className="pop-up__span-error"></span>
      </PopupWithForm>
    )
}

export default EditProfilePopup
