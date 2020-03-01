import api from '../configs/api';

export default class Todo {

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

  createTodo(title, projectId) {
    return this._callApi('POST', '/todos/', {
      title: title,
      projectId: projectId
    });
  }

  editTodo(title, id, doneStatus, projectId) {
    return this._callApi('PUT', `/todos/${id}`, {
      title: title, 
      doneStatus: doneStatus,
      projectId: projectId
    });
  }

  deleteTodo(id) {
    return this._callApi('DELETE', `/todos/${id}`, null);
  }
}
