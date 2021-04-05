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
import { ProjectContext } from '../contexts/ProjectContext';
import { TodoContext } from '../contexts/TodoContext';
import Auth from '../api/Auth';

const TopBar = () => {
  const { authContext, authDispatch } = useContext(AuthContext);
  const { projectDispatch } = useContext(ProjectContext);
  const { todoDispatch } = useContext(TodoContext);

  const auth = new Auth(authContext.token);

  const history = useHistory();

  const onLogoutClick = () => {
    auth.logoutUser()
      .then(() => {
        authDispatch({
          type: 'LOGOUT'
        });
        
        projectDispatch({
          type: 'CLEAR_PROJECTS'
        });

        todoDispatch({
          type:'CLEAR_TODOS'
        });

        history.push('/login');
      })
      .catch((e) => console.log(e));
  };

  return (
    <AppBar position="static" style={styles.appBar}>
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
            id="logoutButton"
            onClick={() => onLogoutClick()}>Logout</Button>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};

const styles = {
  appBar: {
    background: '#DC4C3F'
  }
};

export default TopBar;
