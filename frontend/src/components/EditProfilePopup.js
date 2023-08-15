import {useState, useEffect, useContext} from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  

  useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <>
      <PopupWithForm
        popupName='profile'
        title='Редактировать профиль'
        submitTitle='Сохранить'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input 
          className="popup__info popup__info_type_name profile-edit__name" 
          value={name} onChange={handleChangeName} 
          id="name-input" 
          name="name" 
          type="text" 
          placeholder="Имя" 
          minLength="2" 
          maxLength="40" 
          required
        />
        <span className="popup__input-error name-input-error"></span>
        <input 
          className="popup__info popup__info_type_description profile-edit__description" 
          value={description} 
          onChange={handleChangeDescription} 
          id="description-input" 
          name="about" 
          type="text" 
          placeholder="Описание" 
          minLength="2" 
          maxLength="200" 
          required
        />
        <span className="popup__input-error description-input-error"></span>
      </PopupWithForm>
    </>
  )
}

export default EditProfilePopup;