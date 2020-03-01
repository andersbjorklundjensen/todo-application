import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authContext } = useContext(AuthContext);
  return (
    <Route {...rest} render={
      (props) => {
        if (authContext.token) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }
    } />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func
};

export default ProtectedRoute;

