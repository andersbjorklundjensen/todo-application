import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import ProjectReducer from '../reducers/ProjectReducer';

export const ProjectContext = createContext();

const initialState = {
  projects: [],
  currentProject: null,
};

const ProjectContextProvider = ({ children }) => {
  const [projectContext, projectDispatch] = useReducer(ProjectReducer, initialState, () => {
    const projectData = localStorage.getItem('todo-app:project');
    return projectData ? JSON.parse(projectData) : initialState;
  });

  const projectContextAPI = {
    deleteProject: (id) => {
      projectDispatch({
        type: 'DELETE_PROJECT',
        id: id
      })
    },
    editProject: (id, name) => {
      projectDispatch({
        type: 'EDIT_PROJECT',
        id: id,
        name: name
      });
    }
  }

  return (
    <ProjectContext.Provider value={{ projectContext, projectDispatch, projectContextAPI }}>
      {children}
    </ProjectContext.Provider>
  );
};

ProjectContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProjectContextProvider;
