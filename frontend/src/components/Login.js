import * as auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

function Login({handleLogin}) {

  const navigate = useNavigate();

  function handleAuthorize({email, password}) {
    auth.authorize(email, password)
      .then((data) => {
          localStorage.setItem("token", data.token);
          navigate("/", {replace: true});
          handleLogin(email);
        })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  return (
    <div className="profile__auth">
      <LoginForm
        authName="Authorization" 
        title="Вход" 
        submitTitle="Войти"
        onSubmit={handleAuthorize}
      />
    </div>
  )
}

export default Login;