import ApiCaller from './ApiCaller';

export default class ProjectApiWrapper extends ApiCaller {
  createProject(name) {
    return this.callApi('POST', '/projects', {
      name,
    });
  }

  getAllProjects() {
    return this.callApi('GET', '/projects', null);
  }

  getProjectAndTodos(id) {
    return this.callApi('GET', `/projects/${id}`, null);
  }

  editProject(id, name) {
    return this.callApi('PUT', `/projects/${id}`, {
      name,
    });
  }

  deleteProject(id) {
    return this.callApi('DELETE', `/projects/${id}`, null);
  }
}
