import React, { Fragment, useState, useContext, useEffect } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Divider,
  ClickAwayListener
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Project from '../api/Project';
import { AuthContext } from '../contexts/AuthContext';
import { ProjectContext } from '../contexts/ProjectContext';
import ProjectList from './ProjectList';

const ProjectListTab = () => {
  const [projectName, setProjectName] = useState('');
  const [editingState, setEditingState] = useState(false);

  const { authContext } = useContext(AuthContext);
  const { projectContextAPI } = useContext(ProjectContext);

  const project = new Project(authContext.token);

  useEffect(() => {
    (async () => {
      const response = await project.getAllProjects()
        .catch((e) => console.log(e));

      projectContextAPI.setProjects(response.projects);
    })();
  }, []);

  const onAddIconClick = () => {
    setEditingState(true);
  };

  const onAddProjectFormSubmit = async (e) => {
    e.preventDefault();

    const response = await project.createProject(projectName)
      .catch((e) => console.log(e));

    projectContextAPI.addProject(response.projectId, projectName)
    setEditingState(false)
    setProjectName('')
  };

  const addProjectForm = (
    <ClickAwayListener onClickAway={() => onAddProjectClickAway()}>
      <form onSubmit={async (e) => await onAddProjectFormSubmit(e)}>
        <TextField id="projectNameInput" label="Project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      </form>
    </ClickAwayListener>
  );

  const onAddProjectClickAway = () => {
    setProjectName('');
    setEditingState(false);
  };

  return (
    <Fragment>
      <ListItem>
        <ListItemText primary="Projects" />
        <ListItemIcon>
          <AddIcon id="addProjectButton" onClick={() => onAddIconClick()} />
        </ListItemIcon>
      </ListItem>
      <Divider />
      <ProjectList />
      <Fragment>
        {editingState && (addProjectForm)}
      </Fragment>
    </Fragment>
  );
};

export default ProjectListTab;
