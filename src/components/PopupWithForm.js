
const PopupWithForm = ({isOpen, onClose, name, onSubmit, textBtn, children , title}) => {
    return (
    <div id={name} className={isOpen ? 'pop-up pop-up_active' : 'pop-up'}>
    <div className="pop-up__container pop-up__container_background">
      <button className="pop-up__btn-close" type="button" aria-label="Close" onClick={onClose}></button>
      <h2 className="pop-up__title">
        {title}
      </h2>
      <form id="edit-form" className="pop-up__form" action="#" name={name} noValidate onSubmit={onSubmit}>
        {children}
        <button className="pop-up__btn-save" type="submit">
          {textBtn}
        </button>
      </form>
    </div>
  </div>
    )
}

export default PopupWithForm
