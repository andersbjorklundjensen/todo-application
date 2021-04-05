import ApiCaller from './ApiCaller';

export default class AuthenticationApiWrapper extends ApiCaller {
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
