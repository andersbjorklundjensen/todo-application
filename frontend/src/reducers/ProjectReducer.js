const ProjectReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'SET_PROJECTS':
      newState = {
        ...state,
        projects: action.projects,
      };
      localStorage.setItem('todo-app:project', JSON.stringify(newState));
      return newState;

    case 'SET_CURRENT_PROJECT':
      newState = {
        ...state,
        currentProject: action.currentProject,
        currentProjectName: action.currentProjectName,
      };
      localStorage.setItem('todo-app:project', JSON.stringify(newState));
      return newState;

    case 'ADD_PROJECT':
      newState = {
        ...state,
        projects: [
          ...state.projects,
          {
            id: action.id,
            name: action.name,
          },
        ],
      };
      localStorage.setItem('todo-app:project', JSON.stringify(newState));
      return newState;

    case 'EDIT_PROJECT':
      newState = {
        ...state,
        projects: [
          ...state.projects.filter((project) => project.id !== action.id),
          { id: action.id, name: action.name },
        ],
      };
      localStorage.setItem('todo-app:project', JSON.stringify(newState));
      return newState;

    case 'DELETE_PROJECT':
      newState = {
        ...state,
        projects: state.projects
          .filter((project) => project.id !== action.id),
      };
      localStorage.setItem('todo-app:project', JSON.stringify(newState));
      return newState;

    case 'CLEAR_PROJECTS':
      newState = {};
      localStorage.removeItem('todo-app:project');
      return newState;


    default:
      return state;
  }
};

export default ProjectReducer;
