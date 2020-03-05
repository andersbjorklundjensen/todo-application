import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import AuthReducer from '../reducers/AuthReducer';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authContext, authDispatch] = useReducer(AuthReducer, {}, () => {
    const authData = localStorage.getItem('todo-app:auth');
    return authData ? JSON.parse(authData) : {};
  });

  return (
    <AuthContext.Provider value={{ authContext, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContextProvider;
