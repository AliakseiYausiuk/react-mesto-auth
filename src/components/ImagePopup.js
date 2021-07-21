

const ImagePopup = ({card, onClose}) => {
    return (
      <div id="pop-up-foto" className={card ? "pop-up pop-up_active" : "pop-up"}>
        <div className="pop-up__foto-container">
          <button id="pop-up-foto__btn-close" className="pop-up__btn-close" type="button" aria-label="Close" onClick={onClose}></button>
          <figure className="pop-up__block-figure">
            <img className="pop-up__img" src={card?.card.link} alt={card?.card.name}/>
            <figcaption className="pop-up__text-img">
              {card?.card.name}
            </figcaption>
          </figure>
        </div>
      </div>
    )
}

export default ImagePopup
