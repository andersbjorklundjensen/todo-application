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
import Project from '../api/Project';

const ProjectListItem = (props) => {
  const [editingState, setEditingState] = useState(false);
  const [projectName, setProjectName] = useState('');

  const { authContext } = useContext(AuthContext);
  const { projectContext, projectDispatch } = useContext(ProjectContext);

  const project = new Project(authContext.token);

  const onProjectClick = (index, projectId, projectName) => {
    projectDispatch({

      type: 'SET_CURRENT_PROJECT',
      currentProject: projectId,
      currentProjectName: projectName

    });
  };

  const onEditIconClick = () => {
    setEditingState(true);
    setProjectName(props.project.name);
  };

  const onDeleteIconClick = (id) => {
    project.deleteProject(id)
      .then(() => projectDispatch({

        type: 'DELETE_PROJECT',
        id: id

      }))
      .catch((e) => console.log(e));
  };

  const onSubmitEditForm = (e, id, name) => {
    e.preventDefault();

    project.editProject(id, name)
      .then(() => projectDispatch({

        type: 'EDIT_PROJECT',
        id: id,
        name: name

      }))
      .catch((e) => console.log(e));

    setEditingState(false);
  };

  const editState = (
    <ListItem>
      <form onSubmit={(e) => onSubmitEditForm(e, props.project.id, projectName)}>
        <TextField id="editProjectInput" label="Standard" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      </form>
    </ListItem>
  );

  const normalState = (
    <ListItem
      button
      selected={projectContext.currentProject === props.project.id}
      onClick={() => onProjectClick(props.index, props.project.id, props.project.name)}
      key={props.index}>
      <ListItemText
        primary={props.project.name}
      />
      <EditIcon id="editProjectButton" onClick={() => onEditIconClick()} />
      <DeleteIcon id="deleteProjectButton" onClick={() => onDeleteIconClick(props.project.id)} />
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
