import React from 'react'

const InfoTooltip = ({isOpen, onClose, message}) => {
    return (
        <div className={isOpen ? 'pop-up pop-up_active' : 'pop-up'}>
        <div className="pop-up__container pop-up__container_background pop-up__container_authorization">
          <button className="pop-up__btn-close" type="button" aria-label="Close" onClick={onClose}></button>
          <img className="pop-up__icon" src={message.iconPath} alt="Значок результата регистрации"></img>
          <p className="pop-up__icon-text">{message.text}</p>
        </div>
      </div>
    )
}

export default InfoTooltip
