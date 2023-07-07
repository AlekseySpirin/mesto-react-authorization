function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(endpoint, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`

  return fetch(`http://localhost:3000${endpoint}`, options).then(checkResponse);
}

export const register = (email, password) =>
  request('/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
export const authorize = (email, password) =>
  request('/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
export const getContent = (token) =>
  request('/users/me', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
