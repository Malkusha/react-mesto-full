import {useState} from "react";

function LoginForm({authName, title, submitTitle, onSubmit}) {
  
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    const {email, password} = formValue;
    onSubmit({email, password});
  }

  return (
    <>
      <h1 className="profile__auth-title">{title}</h1>
      <form 
        className="profile__auth-form" 
        name={title} 
        action="submit" 
        id={authName} 
        onSubmit={handleSubmit} 
        noValidate
      >
        <input 
          className="profile__auth-input" 
          placeholder="Email" 
          name="email" 
          type="email" 
          onChange={handleChange} 
          required
        />
        <input 
          className="profile__auth-input" 
          placeholder="Пароль" 
          name="password" 
          type="password" 
          onChange={handleChange} 
          required
        />
        <button 
          className="profile__auth-button" 
          type="submit" 
          form={authName}
        >{submitTitle}</button>
      </form>
    </>
  )
}

export default LoginForm;