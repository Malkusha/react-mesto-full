function PopupWithForm({popupName, title, submitTitle, isOpen, onClose, onSubmit, children}) {

  return (
    <div className={`popup popup_type_${popupName} ${isOpen ? `popup_opened` : ``}`}>
          <div className="popup__container">
            <button 
              className="popup__close-button" 
              type="button" 
              aria-label="Закрыть" 
              onClick={onClose}
            />
            <form 
              className="popup__edit-form" 
              name={popupName} 
              action="submit" 
              id={popupName} 
              onSubmit={onSubmit} 
              noValidate
            >
              <h2 className="popup__title">{title}</h2>
              {children}
              <button className="popup__save-button" type="submit" form={popupName}>{submitTitle}</button>
            </form>
          </div>
    </div>
  )
}

export default PopupWithForm;