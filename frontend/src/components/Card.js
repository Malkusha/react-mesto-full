import {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({card: {_id, name, link, likes, owner}, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = owner === currentUser._id;
  const isLiked = likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `elements__like ${isLiked && 'elements__like_type_on'}` 
  );

  function handleClick() {
    onCardClick({_id, name, link, likes});
  }

  function handleLike() {
    onCardLike({_id, likes});
  }

  function handleDeleteClick() {
    onCardDelete({_id})
  }

  return (
    <div className="elements__item" key={_id}>
      <img className="elements__item-image"  src={link} alt={name} onClick={handleClick} />
      {isOwn && <button className="elements__delete" type="button" aria-label="Удаление" onClick={handleDeleteClick} />}
      <div className="elements__item-info">
        <h2 className="elements__item-title">{name}</h2>
        <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLike}></button>
        <p className="elements__likes-count">{likes.length}</p>
      </div>
    </div>
  )
}

export default Card;