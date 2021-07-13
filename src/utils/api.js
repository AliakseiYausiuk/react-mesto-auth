
class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getFullInfo() {
    return Promise.all([this.getInitialCards(), this.getUserData()])
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,{
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }

  userEdit(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._getResponseData(res))
  }

  newCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._getResponseData(res))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
  }

  upgradeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => this._getResponseData(res))
  }

  incrementLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
  }


  decrementLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
  }

  changeLikeCardStatus(id, bool) {
    return bool ? this.decrementLike(id) : this.incrementLike(id);
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'af9c4ef2-e2ab-4c32-9f5d-4c36de022449',
    'Content-Type': 'application/json'
  }
})


export default api;
