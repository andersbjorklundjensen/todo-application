import api from '../configs/api';

export default class Item {

  constructor(apiToken) {
    this._apiToken = apiToken;
  }

  _callApi(method, route, body) {
    //console.log(`${method} ${route} ${body}`);
    
    if (method === 'GET') {
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

  getAllItems() {
    return this._callApi('GET', '/item/all', null);
  }

  getItem(id) {
    return this._callApi('GET', `/item/${id}`, null);
  }

  saveItem(name) {
    return this._callApi('POST', '/item', {
      name: name
    });
  }

  editItem(id, name) {
    return this._callApi('PUT', `/item/${id}`, {
      name: name
    });
  }

  deleteItem(id) {
    return this._callApi('DELETE', `/item/${id}`, null);
  }

}
