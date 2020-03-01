import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import TodoReducer from '../reducers/TodoReducer';

export const TodoContext = createContext();

const initialState = {
  todos: []
};

const TodoContextProvider = (props) => {
  const [todoContext, todoDispatch] = useReducer(TodoReducer, initialState, () => {
    const todoData = localStorage.getItem('todo-app:todo');
    return todoData ? JSON.parse(todoData) : initialState;
  });

  return (
    <TodoContext.Provider value={{ todoContext, todoDispatch }}>
      {props.children} 
    </TodoContext.Provider>
  );
};

TodoContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default TodoContextProvider;
