import api from '../configs/api';

export default class TodoApiWrapper {
  constructor(apiToken) {
    this.apiToken = apiToken;
  }

  callApi(method, route, body) {
    // console.log(`${method} ${route} ${body}`);

    if (method === 'GET') {
      return fetch(`${api.API_URL}${route}`, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.apiToken,
        },
      })
        .then((response) => response.json());
    }

    return fetch(`${api.API_URL}${route}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.apiToken,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json());
  }

  createTodo(title, projectId) {
    return this.callApi('POST', '/todos/', {
      title,
      projectId,
    });
  }

  editTodo(title, id, doneStatus, projectId) {
    return this.callApi('PUT', `/todos/${id}`, {
      title,
      doneStatus,
      projectId,
    });
  }

  deleteTodo(id) {
    return this.callApi('DELETE', `/todos/${id}`, null);
  }
}
