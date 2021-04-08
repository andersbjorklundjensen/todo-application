import React from 'react';
import {
  ListItem,
  ListItemText,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const ProjectListItem = ({ project, onClick, onEditIconClick, onDeleteIconClick, selected }) => {
  return (
    <ListItem
      button
      selected={selected}
      onClick={() => onClick()}
    >
      <ListItemText
        primary={project.name}
      />
      <EditIcon id="editProjectButton" onClick={() => onEditIconClick()} />
      <DeleteIcon
        id="deleteProjectButton"
        onClick={() => onDeleteIconClick()}
      />
    </ListItem>
  );
};

ProjectListItem.propTypes = {
  project: PropTypes.object,
};

export default ProjectListItem;
