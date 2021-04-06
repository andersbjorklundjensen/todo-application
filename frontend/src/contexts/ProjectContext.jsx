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
    addProject: (id, name) => {
      projectDispatch({
        type: 'ADD_PROJECT',
        id,
        name
      })
    },
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
    },
    setCurrentProject: (projectId, projectName) => {
      projectDispatch({
        type: 'SET_CURRENT_PROJECT',
        currentProject: projectId,
        currentProjectName: projectName
      });
    },
    setProjects: (projects) => {
      projectDispatch({
        type: 'SET_PROJECTS',
        projects
      })
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
