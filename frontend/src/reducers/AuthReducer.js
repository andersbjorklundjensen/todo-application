/* globals localStorage */

const AuthReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'LOGIN':
      newState = {
        ...state,
        username: action.username,
        token: action.token,
      };
      localStorage.setItem('todo-app:auth', JSON.stringify(newState));
      return newState;

    case 'LOGOUT':
      newState = {};
      localStorage.removeItem('todo-app:auth');
      return newState;

    default:
      return state;
  }
};

export default AuthReducer;
