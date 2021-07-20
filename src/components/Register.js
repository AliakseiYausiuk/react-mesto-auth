import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Register = ({registration}) => {


    const [data, setData] = useState({email: '', password: ''})


    const handleChange = (e) => {
      const {name, value} = e.target;
      setData({
        [name]: value 
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const {email, password} = data;
      registration(email, password);
    }

    // handleChange = handleChange.bind(this);
    // handleSubmit = handleSubmit.bind(this);


    return (
        <section className="authorization">
        <h2 className="authorization__title">
          Регистрация
        </h2>
        <form className="authorization__form" action="#" name="registerName" noValidate onSubmit={handleSubmit}>
          <input id='email-Input-Register' type="text" className="authorization__dataInput" value={data.email} onChange={handleChange} name="email-Register" placeholder="Ваш Email" minLength="2" maxLength="40"  required/>
          <input id='password-Input-Register' type="password" className="authorization__dataInput" value={data.password} onChange={handleChange} name="password-Register" placeholder="Пароль" minLength="2" maxLength="200" required/>
          <button className="authorization__btn" type="submit">
            Зарегистрироваться
          </button>
          <Link className='authorization__link' to='/sign-in'>Уже зарегистрированы? Войти</Link>
        </form>
        </section>
    )
}

export default Register
