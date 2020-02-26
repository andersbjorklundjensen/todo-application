import api from '../configs/api';

export default class Auth {

  constructor(apiToken) {
    this._apiToken = apiToken;
  }

  _callApi(method, route, body) {
    //console.log(`${method} ${route} ${body}`);
    
    if (body === null) {
      return fetch(`${api.API_URL}${route}`, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this._apiToken
        }
      })
        .then((response) => response.json());
    } 

    return fetch(`${api.API_URL}${route}`, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this._apiToken
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json());
  }

  registerUser(username, password) {
    return this._callApi('POST', '/auth/register', {
      username: username,
      password: password
    });
  }

  loginUser(username, password) {
    return this._callApi('POST', '/auth/login', {
      username: username,
      password: password
    });
  }

  logoutUser() {
    return this._callApi('POST', '/auth/logout', null);
  }

}
