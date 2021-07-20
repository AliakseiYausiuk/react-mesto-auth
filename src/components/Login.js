import React, {useState} from 'react'

const Login = ({authorization}) => {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const handleChangeEmail = (e) => {
      setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
      setPassword(e.target.value);
    }

    
  function handleSubmit(e){
    e.preventDefault();

    authorization(email,password);
  }

    return (
        <section className="authorization">
        <h2 className="authorization__title">
          Вход
        </h2>
        <form className="authorization__form" action="#" name="registerName" onSubmit={handleSubmit} noValidate >
          <input id='email-Input-Login' type="text" className="authorization__dataInput" value={email} onChange={handleChangeEmail} name="email-Login" placeholder="Ваш Email" minLength="2" maxLength="40"  required/>
          <input id='password-Input-Login' type="password" className="authorization__dataInput" value={password} onChange={handleChangePassword} name="password-Login" placeholder="Пароль" minLength="2" maxLength="200" required/>
          <button className="authorization__btn" type="submit">
            Войти
          </button>
        </form>
        </section>
    )
}

export default Login
