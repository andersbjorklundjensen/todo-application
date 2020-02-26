import React, { useContext } from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Grid
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Auth from '../api/Auth';

const TopBar = () => {
  const { authContext, authDispatch } = useContext(AuthContext);
  const auth = new Auth(authContext.token);

  const history = useHistory();

  const onLogoutClick = () => {
    auth.logoutUser()
      .then(() => {
        authDispatch({
          type: 'LOGOUT'
        });

        history.push('/login');
      })
      .catch((e) => console.log(e));
  };

  return (
    <AppBar position="static">
      <Grid
        container
        justify="flex-end"
      >
        <Toolbar>
          <Typography variant="h6">
            {authContext.username}
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => onLogoutClick()}>Logout</Button>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};

export default TopBar;
