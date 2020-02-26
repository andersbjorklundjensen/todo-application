
const AuthReducer = (state, action) => {
  let newState;

  switch(action.type) {
  case 'LOGIN':
    newState = {
      ...state, 
      username: action.username,
      token: action.token
    };
    localStorage.setItem('starter-pack:auth', JSON.stringify(newState));
    return newState;
      
  case 'LOGOUT':
    newState = {};
    localStorage.removeItem('starter-pack:auth');
    return newState;

  default:
    return state;
  }
};

export default AuthReducer;
