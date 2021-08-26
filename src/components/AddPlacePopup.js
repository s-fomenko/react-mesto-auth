import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setPlace('');
    setLink('');
  }, [isOpen]);

  const handleAddPlace = e => setPlace(e.target.value);
  const handleAddLink = e => setLink(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();

    onAddPlace({
      name: place,
      link
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__input-wrapper">
        <input className="form__input" id="place" type="text" name="place" placeholder="Название" minLength="2"
               maxLength="30" required value={place || ''} onChange={handleAddPlace} />
        <span className="form__input-error place-error"/>
      </div>
      <div className="form__input-wrapper">
        <input className="form__input" id="link" type="url" name="link" placeholder="Ссылка на картинку" required value={link || ''} onChange={handleAddLink} />
        <span className="form__input-error link-error"/>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
