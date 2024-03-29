function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(endpoint, options) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return fetch(`http://localhost:4000${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  }).then(checkResponse);
}

export const register = (email, password) =>
  request('/signup', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
export const authorize = (email, password) =>
  request('/signin', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
export const logout = () =>
  request('/logout', {
    method: 'GET',
  });
export const getContent = () =>
  request('/users/me', {
    method: 'GET',
  });
