import React, { Fragment, useState, useContext, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ProjectListItem from '../components/ProjectListItem';
import Project from '../api/Project';
import { AuthContext } from '../contexts/AuthContext';
import { ProjectContext } from '../contexts/ProjectContext';

const ProjectListTab = () => {
  const [projectName, setProjectName] = useState('');

  const [editingState, setEditingState] = useState(false);

  const { authContext } = useContext(AuthContext);
  const { projectContext, projectDispatch } = useContext(ProjectContext);

  const project = new Project(authContext.token);

  useEffect(() => {
    project
      .getAllProjects()
      .then((response) => projectDispatch({

        type: 'SET_PROJECTS',
        projects: response.projects

      }))
      .catch((e) => console.log(e));
  }, []);

  const onAddIconClick = () => {
    setEditingState(true);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    project
      .createProject(projectName)
      .then((response) => projectDispatch({

        type: 'ADD_PROJECT',
        id: response.projectId,
        name: projectName

      }))
      .then(() => setEditingState(false))
      .then(() => setProjectName(''))
      .catch((e) => console.log(e));
  };

  const addProjectForm = (
    <form onSubmit={(e) => onFormSubmit(e)}>
      <TextField id="standard-basic" label="Project name" value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
    </form>
  );

  return (
    <Fragment>
      <ListItem>
        <ListItemText primary="Projects" />
        <ListItemIcon>
          <AddIcon  onClick={() => onAddIconClick()}/>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <List component="div" disablePadding>
        {projectContext.projects && projectContext.projects.map((project, index) => (
          <ProjectListItem key={index} project={project} index={index} />
        ))}
      </List>
      <Fragment>
        {editingState && (addProjectForm)}
      </Fragment>
    </Fragment>
  );
};

export default ProjectListTab;
