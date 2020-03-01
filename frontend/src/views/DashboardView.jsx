import React from 'react';
import {
  Container,
  Grid
} from '@material-ui/core';
import TopBar from '../components/TopBar';
import ProjectListTab from '../components/ProjectListTab';
import TodoListTab from '../components/TodoListTab';

const DashboardView = () => {
  return (
    <div>
      <TopBar />
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ProjectListTab />
          </Grid>
          <Grid item xs={8}>
            <TodoListTab />
          </Grid>
        </Grid>        
      </Container>
    </div>
  );
};

export default DashboardView;
