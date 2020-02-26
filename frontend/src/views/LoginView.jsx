import React, { useState, useContext } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  CssBaseline
} from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Auth from '../api/Auth';

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { authDispatch } = useContext(AuthContext);
  const auth = new Auth(null);
  const history = useHistory();

  const onLoginFormSubmit = (e, username, password) => {
    e.preventDefault();

    auth.loginUser(username, password)
      .then((response) => {
        console.log(response);

        authDispatch({
          type: 'LOGIN',
          username: username,
          token: response.token
        });

        history.push('/items');
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography style={styles.headline} component="h1" variant="h5">
          Sign in
        </Typography>
        <form 
          noValidate 
          onSubmit={(e) => onLoginFormSubmit(e, username, password)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={styles.signInButton}
          >
            Sign in
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/register">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const styles = {
  headline: {
    margin: '20px 0'
  },
  signInButton: {
    margin: '20px 0'
  }
};

export default LoginView;
