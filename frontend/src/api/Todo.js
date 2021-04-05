import ApiCaller from './ApiCaller';

export default class TodoApiWrapper extends ApiCaller {
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
