import React, {useState} from 'react';
import PopupWithForm from './PopupWithForm.js';

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {

    const [name, setName] = useState('');

    const [link, setLink] = useState('');
    
    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const handleChangeLink = (e) => {
        setLink(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        onAddPlace({
            name,
            link
        })
        setLink('');
        setName('');
    }
    

    return (
      <PopupWithForm title='Новое место' name='pop-up-supplement-foto' textBtn='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <input id='NameFoto' type="text" className="pop-up__text" value={name || ''} onChange={handleChangeName} name="content-name-foto" placeholder='Название' minLength='2' maxLength="30" required/>
        <span id="NameFoto-error" className="pop-up__span-error"></span>
        <input id='linkFoto' type="url" className="pop-up__text" value={link || ''} onChange={handleChangeLink} name="content-foto" placeholder='Ссылка на картинку' required/>
        <span id="linkFoto-error" className="pop-up__span-error"></span>
      </PopupWithForm>
    )
}

export default AddPlacePopup
