import React, { Fragment, useState, useContext, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Divider,
  ClickAwayListener
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
  const { projectContext, projectDispatch, projectContextAPI } = useContext(ProjectContext);

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

  const onAddProjectFormSubmit = (e) => {
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
    <ClickAwayListener onClickAway={() => onAddProjectClickAway()}>
      <form onSubmit={(e) => onAddProjectFormSubmit(e)}>
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
      <List id="projectList" component="div" disablePadding>
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
