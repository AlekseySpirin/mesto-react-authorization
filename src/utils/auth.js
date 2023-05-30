function checkResponse(res) {
	
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
}

function request(endpoint, options) {
	// принимает два аргумента: урл и объект опций, как и `fetch`
	
	return fetch(`https://auth.nomoreparties.co${endpoint}`, options).then(checkResponse);
}



export const register = (email, password) => {
	return  request('/signup', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email, password})
	})
};
export const authorize = (email, password) => {
	return request('/signin', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email, password})
	});
	
};
export const getContent = (token) => {
	return request('/users/me', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	})
	
};