import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from './LoginForm';
import InfoToolTip from './InfoTooltip';
import Success from '../images/Success.svg';
import Fail from '../images/Fail.svg';
import * as auth from '../utils/auth.js';

 

function Register({title}) {

  const navigate = useNavigate();
  const [isSuccessToolTipOpen, setIsSuccessToolTipOpen] = useState(false);
  const [isFailToolTipOpen, setIsFailToolTipOpen] = useState(false);

  function handleSuccessToolTip() {
    setIsSuccessToolTipOpen(true);
  }

  function handleFailToolTip() {
    setIsFailToolTipOpen(true);
  }

  function handleRegister({email, password}) {
    auth.register(email, password)
      .then(() => {
        handleSuccessToolTip()})
      .catch((err) => {
        handleFailToolTip();
        console.log(err);
        
      })
  }  

  return (
    <>
      <div className="profile__auth">
      <h1 className="profile__auth-title">{title}</h1>
      <LoginForm
        authName="Registration" 
        title="Регистрация" 
        submitTitle="Зарегистрироваться"
        onSubmit={handleRegister}
      />
      <Link className='profile__reg-link' to="/signin">Уже зарегистрированы? Войти</Link>
    </div>
    <InfoToolTip
      popupName="success"
      title={<><p className="popup__text">Вы успешно</p><p className="popup__text">зарегистрировались!</p></>} 
      isOpen={isSuccessToolTipOpen}
      toolTipImg={Success}
      onClose={() => {
        setIsSuccessToolTipOpen(false);
        navigate("/signin", {replace: true});
      }}
    />
    <InfoToolTip
      popupName="fail"
      title={<><p className="popup__text">Что-то пошло не так!</p><p className="popup__text">Попробуйте ещё раз.</p></>} 
      toolTipImg={Fail}
      isOpen={isFailToolTipOpen}
      onClose={() => setIsFailToolTipOpen(false)}
    />
    </>
    
  )
}

export default Register;