import React from 'react';
import fail from '../images/fail.svg';
import success from '../images/success.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__button" type="button" onClick={onClose}/>
        <div className="popup__wrapper">
          <img className="popup__icon" src={isSuccess ? success : fail} alt="Результат авторизации"/>
          <p className="popup__text">
            {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
