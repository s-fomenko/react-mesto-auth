function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_image">
        <button className="popup__button" type="button" onClick={onClose}/>
        <div className="image">
          <img className="image__item" src={card.link} alt={card.name}/>
          <p className="image__description">
            {card.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
