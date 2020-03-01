import React, { useContext } from 'react';
import {
  Container,
  Grid
} from '@material-ui/core';
import TopBar from '../components/TopBar';
import ProjectListTab from '../components/ProjectListTab';
import TodoListTab from '../components/TodoListTab';
import { ProjectContext } from '../contexts/ProjectContext';

const DashboardView = () => {
  const { projectContext } = useContext(ProjectContext);

  return (
    <div>
      <TopBar />
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ProjectListTab />
          </Grid>
          <Grid item xs={8}>
            {projectContext.currentProject && <TodoListTab />}
          </Grid>
        </Grid>        
      </Container>
    </div>
  );
};

export default DashboardView;
