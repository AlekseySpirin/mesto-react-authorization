export default class Api {
  constructor(option) {
    this.url = option.url;
    this.headers = option.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(endpoint, options) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this.url}${endpoint}`, options).then(this._getResponseData);
  }

  getInitialCards() {
    return this._request('/cards', {
      method: 'GET',
      headers: this.headers,
    });
  }

  getServerUserInfo() {
    return this._request('/users/me', {
      method: 'GET',
      headers: this.headers,
    });
  }

  editServerProfile({ name, about }) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  editAvatar({ avatar }) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    });
  }

  addCardServer({ name, link }) {
    return this._request('/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCardServer(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this.headers,
    });
  }
}
