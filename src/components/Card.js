import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`card__button card__button_type_remove ${isOwn ? 'card__button_visible' : ''}`);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`card__button card__button_type_like ${isLiked ? 'card__button_active' : ''}`);

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <div className="card__inner">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__wrapper">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"/>
          <span className="card__likes-count">{card.likes.length}</span>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"/>
    </article>
  );
}

export default Card;
