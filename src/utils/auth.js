class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  registration = (email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password})
    })
      .then(this._checkServerResponse)
  }

  authorization = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password})
    })
      .then(this._checkServerResponse)
  }

  checkToken = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
      .then(this._checkServerResponse)
  }
}

const auth = new Auth('https://auth.nomoreparties.co');

export default auth;
