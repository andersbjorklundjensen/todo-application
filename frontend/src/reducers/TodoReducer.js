const TodoReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'SET_TODOS':
      newState = {
        ...state,
        todos: action.todos,
      };
      localStorage.setItem('todo-app:todo', JSON.stringify(newState));
      return newState;

    case 'ADD_TODO':
      newState = {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            title: action.title,
            doneStatus: action.doneStatus,
          },
        ],
      };
      localStorage.setItem('todo-app:todo', JSON.stringify(newState));
      return newState;

    case 'EDIT_TODO':
      newState = {
        ...state,
        todos: [
          ...state.todos.filter((todo) => todo.id !== action.id),
          {
            id: action.id,
            title: action.title,
            doneStatus: action.doneStatus,
          },
        ],
      };
      localStorage.setItem('todo-app:todo', JSON.stringify(newState));
      return newState;

    case 'DELETE_TODO':
      newState = {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
      localStorage.setItem('todo-app:todo', JSON.stringify(newState));
      return newState;

    case 'CLEAR_TODOS':
      newState = {};
      localStorage.removeItem('todo-app:todo');
      return newState;

    default:
      return state;
  }
};

export default TodoReducer;
