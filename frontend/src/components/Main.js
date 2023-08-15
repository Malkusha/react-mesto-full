import {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from './Card';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards, setCards}) {

  const currentUser = useContext(CurrentUserContext);
  
  return (
      <main>
        <section className="profile">
          <button className="profile__avatar-hover" onClick={onEditAvatar}>
            <img 
              className="profile__avatar" 
              src={currentUser.avatar}
              alt="Аватар"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}/>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}/>
        </section>
        <section className="elements">
        {cards.map((item) => {
            return (
              <Card
                key={item._id}
                card={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          })}
        </section>   
      </main>
  )
}

export default Main;