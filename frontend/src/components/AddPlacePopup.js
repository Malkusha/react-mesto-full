import {useState, useEffect, useContext} from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('#');
 
  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e,) {
    e.preventDefault();
    onAddPlace({name, link});
  }
 
  return (
    <PopupWithForm
      popupName='card'
      title='Новое место'
      submitTitle='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input 
        className="popup__info popup__info_type_name cards-edit__name" 
        value={name} 
        onChange={handleChangeName} 
        id="place-input" 
        name="title"
        type="text" 
        placeholder="Название" 
        minLength="2" 
        maxLength="30" 
        required
      />
      <span className="popup__input-error place-input-error"></span>
      <input 
        className="popup__info popup__info_type_description cards-edit__description" 
        value={link} 
        onChange={handleChangeLink} 
        id="link-input" 
        name="link" 
        type="url" 
        placeholder="Ссылка на картинку" 
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
 )
}

export default AddPlacePopup;