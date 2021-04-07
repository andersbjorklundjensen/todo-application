import React, { Fragment, useState, useContext } from 'react';
import {
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/AuthContext';
import { ProjectContext } from '../contexts/ProjectContext';
import ProjectApiWrapper from '../api/Project';

const ProjectListItem = ({ project, onProjectItemClick, index }) => {
  const [editingState, setEditingState] = useState(false);
  const [projectName, setProjectName] = useState('');

  const { authContext } = useContext(AuthContext);
  const { projectContext, projectContextAPI } = useContext(ProjectContext);

  const projectApiWrapper = new ProjectApiWrapper(authContext.token);

  const onEditIconClick = () => {
    setEditingState(true);
    setProjectName(project.name);
  };

  const onDeleteIconClick = async (id) => {
    await projectApiWrapper.deleteProject(id)
      .catch((e) => console.log(e));

    projectContextAPI.deleteProject(id);
  };

  const onEditProjectFormSubmit = async (e, id, name) => {
    e.preventDefault();
    await projectApiWrapper.editProject(id, name)
      .catch((e) => console.log(e));

    projectContextAPI.editProject(id, name);
    setEditingState(false);
  };

  const editState = (
    <ListItem>
      <form onSubmit={async (e) => await onEditProjectFormSubmit(e, project.id, projectName)}>
        <TextField id="editProjectInput" label="Standard" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      </form>
    </ListItem>
  );

  const normalState = (
    <ListItem
      button
      selected={projectContext.currentProject === project.id}
      onClick={() => onProjectItemClick()}
      key={index}>
      <ListItemText
        primary={project.name}
      />
      <EditIcon id="editProjectButton" onClick={() => onEditIconClick()} />
      <DeleteIcon
        id="deleteProjectButton"
        onClick={async () => await onDeleteIconClick(project.id)}
      />
    </ListItem>
  );

  return (
    <Fragment>
      {editingState ? (editState) : (normalState)}
    </Fragment>
  );
};

ProjectListItem.propTypes = {
  project: PropTypes.object,
  index: PropTypes.number
};

export default ProjectListItem;
