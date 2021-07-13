import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {

    const avatar = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
          avatar: avatar.current.value,
        });
    }

    return (
      <PopupWithForm title='Обновить аватар' name='pop-up-upgred-avatar' textBtn='Да' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <input id="linkFotoAvatar" type="url" className="pop-up__text" ref={avatar} name="contentFotoAvatar" placeholder='Ссылка на картинку' required/>
        <span id="linkFotoAvatar-error" className="pop-up__span-error"></span>
      </PopupWithForm>
    )
}

export default EditAvatarPopup
