import React, { Fragment, useContext, useState } from 'react';
import {
  ListItem,
  ListItemText,
  TextField
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import PropTypes from 'prop-types';
import Todo from '../api/Todo';
import { AuthContext } from '../contexts/AuthContext';
import { ProjectContext } from '../contexts/ProjectContext';
import { TodoContext } from '../contexts/TodoContext';

const TodoListItem = (props) => {
  const [editingState, setEditingState] = useState(false);
  const [title, setTitle] = useState('');

  const { authContext } = useContext(AuthContext);
  const { projectContext } = useContext(ProjectContext);
  const { todoDispatch } = useContext(TodoContext);

  const todo = new Todo(authContext.token);

  const onEditIconClick = () => {
    setEditingState(true);    
    setTitle(props.todo.title);
  };

  const onDeleteIconClick = (id) => {
    todo.deleteTodo(id)
      .then(() => todoDispatch({

        type: 'DELETE_TODO',
        id: id

      }))
      .catch((e) => console.log(e));
  };

  const onSubmitEditForm = (e, title, id, doneStatus, projectId) => {
    e.preventDefault();
    todo.editTodo(title, id, doneStatus, projectId)
      .then(() => todoDispatch({

        type: 'EDIT_TODO',
        id: id,
        title: title,
        doneStatus: doneStatus

      }))
      .then(() => setEditingState(false))
      .catch((e) => console.log(e));
  };

  const onUncheckedIconClick = (title, id, doneStatus, projectId) => {
    todo.editTodo(title, id, doneStatus, projectId)
      .then(() => todoDispatch({

        type: 'EDIT_TODO',
        id: id,
        title: title,
        doneStatus: doneStatus

      }))
      .then(() => setEditingState(false))
      .catch((e) => console.log(e));
  };

  const onCheckedIconClick = (title, id, doneStatus, projectId) => {
    todo.editTodo(title, id, doneStatus, projectId)
      .then(() => todoDispatch({

        type: 'EDIT_TODO',
        id: id,
        title: title,
        doneStatus: doneStatus

      }))
      .then(() => setEditingState(false))
      .catch((e) => console.log(e));
  };

  const editState = (
    <ListItem>
      <form onSubmit={(e) => onSubmitEditForm(e, title, props.todo.id, props.todo.doneStatus, projectContext.currentProject)}>
        <TextField id="standard-basic" label="Standard" value={title} onChange={(e) => setTitle(e.target.value)} />
      </form>
    </ListItem>
  );

  const normalState = (
    <ListItem 
      key={props.index}>
      {props.todo.doneStatus 
        ? (<RadioButtonCheckedIcon onClick={() => onCheckedIconClick(props.todo.title, props.todo.id, false, projectContext.currentProject)} />) 
        : (<RadioButtonUncheckedIcon 
          onClick={() => onUncheckedIconClick(props.todo.title, props.todo.id, true, projectContext.currentProject)} />
        )
      }
      <ListItemText
        primary={props.todo.title}
      />
      <EditIcon onClick={() => onEditIconClick()} />
      <DeleteIcon onClick={() => onDeleteIconClick(props.todo.id)} />
    </ListItem>
  );

  return (
    <Fragment>
      {editingState ? (editState) : (normalState)}
    </Fragment>
  );
};

TodoListItem.propTypes = {
  index: PropTypes.number,
  todo: PropTypes.object
};

export default TodoListItem;
