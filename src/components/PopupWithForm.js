function PopupWithForm({name, title, buttonText, isOpen, onClose, children, onSubmit}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__button" type="button" onClick={onClose}/>
        <form className={`form form_type_${name}`} action="#" name={name} onSubmit={onSubmit}>
          <h2 className={`form__title form__title_type_${name}`}>{title}</h2>
          {children}
          <button className={`form__button form__button_type_${name}`} type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
