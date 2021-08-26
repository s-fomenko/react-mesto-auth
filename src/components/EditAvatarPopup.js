import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__input-wrapper">
        <input className="form__input" id="avatar" type="url" name="avatar" placeholder="Ссылка на аватар" required ref={inputRef} />
        <span className="form__input-error avatar-error"/>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
