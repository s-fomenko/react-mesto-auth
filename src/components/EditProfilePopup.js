import React, {useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

  const handleChangeName = e => setName(e.target.value);
  const handleChangeDescription = e => setDescription(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__input-wrapper">
        <input className="form__input" id="name" type="text" name="name" placeholder="Имя" minLength="2"
               maxLength="40" required value={name || ''} onChange={handleChangeName} />
        <span className="form__input-error name-error"/>
      </div>
      <div className="form__input-wrapper">
        <input className="form__input" id="description" type="text" name="description" placeholder="Описание"
               minLength="2" maxLength="200" required value={description || ''} onChange={handleChangeDescription} />
        <span className="form__input-error description-error"/>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
