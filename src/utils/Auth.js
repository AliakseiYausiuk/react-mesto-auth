export const BASE_URL = 'https://auth.nomoreparties.co';

const checkRequestResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password, email})
  })
  .then(checkRequestResult);
}; 

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
  .then(checkRequestResult)
  // .then((res) => {
  //   if (res.status === 400) {
  //     throw new Error('Не все поля заполнены');
  //   } else if (res.status === 401) {
  //     throw new Error('Email не зарегистрирован');
  //   } else { 
  //     console.log(res);
  //     return res.json()}
  // })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data.token;
    }
  })
}

export const getContent = (token) => {return fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
})
  .then(checkRequestResult)
  .then((data) => data)
}