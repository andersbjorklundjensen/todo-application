import api from '../configs/api';

export default class AuthenticationApiWrapper {
  constructor(apiToken) {
    this.apiToken = apiToken;

    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: this.apiToken,
    }
  }

  callApi(method, route, body) {
    // console.log(`${method} ${route} ${body}`);

    if (body === null) {
      return fetch(`${api.API_URL}${route}`, {
        method,
        headers: this.headers,
      })
        .then((response) => response.json());
    }

    return fetch(`${api.API_URL}${route}`, {
      method,
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json());
  }

  registerUser(username, password) {
    return this.callApi('POST', '/auth/register', {
      username,
      password,
    });
  }

  loginUser(username, password) {
    return this.callApi('POST', '/auth/login', {
      username,
      password,
    });
  }

  logoutUser() {
    return this.callApi('POST', '/auth/logout', null);
  }
}
