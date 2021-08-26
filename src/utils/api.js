class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkServerResponse)
  }

  getCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkServerResponse)
  }

  editUserInfo = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkServerResponse)
  }

  setNewCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkServerResponse)
  }

  deleteCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkServerResponse)
  }

  setLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkServerResponse)
  }

  removeLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkServerResponse)
  }

  changeLikeCardStatus = (carId, isLiked) => {
    return isLiked ? this.removeLike(carId) : this.setLike(carId);
  }

  editUserAvatar = (avatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(this._checkServerResponse)
  }

  getInitialData = () => Promise.all([this.getUserInfo(), this.getCards()])
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '2b1e20c0-2d56-4dae-97da-d3c1a4fc77d4',
    'Content-Type': 'application/json'
  }
})

export default api;
