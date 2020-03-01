import React, { Fragment, useContext, useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  List,
  TextField,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AuthContext } from '../contexts/AuthContext';
import { ProjectContext } from '../contexts/ProjectContext';
import { TodoContext } from '../contexts/TodoContext';
import Project from '../api/Project';
import Todo from '../api/Todo';
import TodoListItem from '../components/TodoListItem';

const TodoListTab = () => {
  const [todoName, setTodoName] = useState('');
  const [addingTodoState, setAddingTodoState] = useState(false);

  const { authContext } = useContext(AuthContext);
  const { projectContext } = useContext(ProjectContext);
  const { todoContext, todoDispatch } = useContext(TodoContext);

  const project = new Project(authContext.token);
  const todo = new Todo(authContext.token);

  useEffect(() => {
    project.getProjectAndTodos(projectContext.currentProject)
      .then((response) => todoDispatch({
      
        type: 'SET_TODOS',
        todos: response.projectTodos.map((todo) => ({ 
          id: todo._id,
          doneStatus: todo.doneStatus,
          title: todo.title
        }))

      }))
      .catch((e) => console.log(e));
  }, [projectContext.currentProject]);

  const onAddTodoFormSubmit = (e, title, projectId) => {
    e.preventDefault();

    todo.createTodo(title, projectId)
      .then((response) => todoDispatch({

        type: 'ADD_TODO',
        id: response.todoId,
        doneStatus: false,
        title: title

      }))
      .then(() => setTodoName(''))
      .then(() => setAddingTodoState(false))
      .catch((e) => console.log(e));
  };

  return (
    <Fragment>
      <Typography variant="h6">
        {projectContext.currentProjectName}
      </Typography>
      <Grid item xs={12}>
        <div>
          <List>
            {todoContext.todos && todoContext.todos.map((todo, index) => (
              <TodoListItem key={index} todo={todo} index={index} />
            ))}
            {addingTodoState ? (
              <ListItem>
                <form onSubmit={(e) => onAddTodoFormSubmit(e, todoName, projectContext.currentProject)}>
                  <TextField id="standard-basic" label="Todo" value={todoName} onChange={(e) => setTodoName(e.target.value)}/>
                </form>
              </ListItem>
            ) : (
              <ListItem onClick={() => setAddingTodoState(true)}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add task" />
              </ListItem>
            )}
          </List>
        </div>
      </Grid>
    </Fragment>
  );
};

export default TodoListTab;
