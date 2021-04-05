import api from '../configs/api';

export default class ApiCaller {
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

    const options = {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body): null
    }

    return fetch(`${api.API_URL}${route}`, options)
      .then((response) => response.json());
  }
}